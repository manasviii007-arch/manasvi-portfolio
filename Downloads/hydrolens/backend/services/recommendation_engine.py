from pydantic import BaseModel
from services.risk_engine import calculate_water_stress

class RecommendationOutput(BaseModel):
    field_id: str
    priority: str
    recommended_action: str
    reason: str

def generate_recommendation(field) -> RecommendationOutput:
    risk = calculate_water_stress(
        soil_moisture=field.soil_moisture,
        temperature=field.temperature,
        rainfall_probability=field.rainfall_probability,
        crop=field.crop,
        growth_stage=field.growth_stage,
        ndvi=field.ndvi,
        water_availability=field.water_availability,
        dry_spell_duration=7
    )

    score = risk.water_stress_score
    cat = risk.risk_category

    if score > 80:
        priority = "URGENT"
        action = f"Immediate drip irrigation dispatch during peak solar window (11:30 AM - 1:15 PM)"
        reason = f"Critical root-zone water stress ({score}%) during sensitive {field.growth_stage} stage with low rainfall probability ({field.rainfall_probability}%)."
    elif score > 60:
        priority = "HIGH"
        action = f"Schedule priority irrigation within 24 hours"
        reason = f"High water stress ({score}%) under elevated temperature ({field.temperature}°C). Crop is in vulnerable {field.growth_stage} phase."
    elif score > 30:
        priority = "MODERATE"
        action = f"Monitor soil moisture and prepare solar pump schedule"
        reason = f"Moderate water stress ({score}%). Rainfall probability is {field.rainfall_probability}%."
    else:
        priority = "LOW"
        action = f"Maintain standard monitoring schedule"
        reason = f"Soil moisture is adequate ({field.soil_moisture}%) and water stress is low ({score}%)."

    return RecommendationOutput(
        field_id=field.field_id,
        priority=priority,
        recommended_action=action,
        reason=reason
    )
