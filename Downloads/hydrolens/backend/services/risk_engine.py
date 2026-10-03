from pydantic import BaseModel
from typing import List

class RiskOutput(BaseModel):
    water_stress_score: int
    risk_category: str
    risk_factors: List[str]

def calculate_water_stress(
    soil_moisture: float,
    temperature: float,
    rainfall_probability: float,
    crop: str,
    growth_stage: str,
    ndvi: float,
    water_availability: float,
    dry_spell_duration: int = 7
) -> RiskOutput:
    """
    Deterministic calculation of water stress score.
    Algorithm:
    1. Base score derived from soil moisture (lower moisture -> higher stress).
    2. Increased by temperature above 30C.
    3. Decreased by rainfall probability.
    4. Increased by dry spell duration.
    5. Increased by critical growth stages (Flowering, Grain Fill).
    6. NDVI factored in (lower NDVI -> higher stress).
    """
    factors = []
    
    # 1. Base from soil moisture (0-100 scale inverted, e.g., 20% moisture gives high base)
    score = max(0.0, 100.0 - (soil_moisture * 2.5))
    if soil_moisture < 15:
        factors.append(f"Critical low soil moisture ({soil_moisture}%)")

    # 2. Temperature effect
    if temperature > 30.0:
        temp_penalty = (temperature - 30.0) * 1.5
        score += temp_penalty
        factors.append(f"High temperature stress ({temperature}°C)")

    # 3. Rain probability relief
    if rainfall_probability > 0:
        score -= (rainfall_probability * 0.3)
        if rainfall_probability > 30:
            factors.append(f"Rain relief expected ({rainfall_probability}% prob)")

    # 4. Dry spell duration penalty
    if dry_spell_duration > 3:
        score += (dry_spell_duration * 1.2)
        factors.append(f"Extended dry spell ({dry_spell_duration} days)")

    # 5. Crop stage sensitivity
    sensitive_stages = ["Flowering", "Grain Fill", "Pod Initiation"]
    if any(stage.lower() in growth_stage.lower() for stage in sensitive_stages):
        score += 15.0
        factors.append(f"Highly sensitive growth stage ({growth_stage})")

    # 6. NDVI penalty
    if ndvi < 0.7:
        score += ((0.7 - ndvi) * 30.0)
        factors.append(f"Sub-optimal vegetation health (NDVI: {ndvi})")

    # Ensure integer 0-100
    final_score = int(max(0, min(100, round(score))))
    
    category = "Low"
    if final_score > 80:
        category = "Critical"
    elif final_score > 60:
        category = "High"
    elif final_score > 30:
        category = "Moderate"

    return RiskOutput(
        water_stress_score=final_score,
        risk_category=category,
        risk_factors=factors
    )

class RiskSummaryOutput(BaseModel):

    total_fields: int
    low_count: int
    moderate_count: int
    high_count: int
    critical_count: int
    high_risk_total: int # high + critical count
    average_stress_score: float
    total_water_availability: float
    average_solar_availability: float
    climate_risk_index: float

def calculate_risk_summary(fields: List) -> RiskSummaryOutput:
    if not fields:
        return RiskSummaryOutput(
            total_fields=0,
            low_count=0,
            moderate_count=0,
            high_count=0,
            critical_count=0,
            high_risk_total=0,
            average_stress_score=0.0,
            total_water_availability=0.0,
            average_solar_availability=0.0,
            climate_risk_index=5.0
        )
    
    total = len(fields)
    low, mod, high, crit = 0, 0, 0, 0
    total_score = 0.0
    total_water = 0.0
    total_solar = 0.0

    for f in fields:
        risk = calculate_water_stress(
            soil_moisture=f.soil_moisture,
            temperature=f.temperature,
            rainfall_probability=f.rainfall_probability,
            crop=f.crop,
            growth_stage=f.growth_stage,
            ndvi=f.ndvi,
            water_availability=f.water_availability,
            dry_spell_duration=7
        )
        total_score += risk.water_stress_score
        total_water += f.water_availability
        total_solar += f.solar_availability

        cat = risk.risk_category.lower()
        if cat == "critical":
            crit += 1
        elif cat == "high":
            high += 1
        elif cat == "moderate":
            mod += 1
        else:
            low += 1

    avg_score = round(total_score / total, 1)
    avg_solar = round(total_solar / total, 1)
    climate_risk = round(min(10.0, max(1.0, (avg_score / 10.0))), 1)

    return RiskSummaryOutput(
        total_fields=total,
        low_count=low,
        moderate_count=mod,
        high_count=high,
        critical_count=crit,
        high_risk_total=high + crit,
        average_stress_score=avg_score,
        total_water_availability=round(total_water, 1),
        average_solar_availability=avg_solar,
        climate_risk_index=climate_risk
    )

