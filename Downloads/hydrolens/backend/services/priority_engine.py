from pydantic import BaseModel
from typing import List
from services.risk_engine import calculate_water_stress

class PriorityItem(BaseModel):
    rank: int
    field_id: str
    sector: str
    crop: str
    growth_stage: str
    urgency: str
    water_stress_score: int
    recommended_vol_m3: int
    risk_driver: str

def calculate_priority_dispatch(fields: List) -> List[PriorityItem]:
    items = []
    
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
        
        score = risk.water_stress_score
        
        # Priority ranking weights
        if score > 80:
            urgency = "Urgent Dispatch"
            vol = 4200
        elif score > 65:
            urgency = "High Priority"
            vol = 3800
        elif score > 40:
            urgency = "Moderate"
            vol = 2900
        else:
            urgency = "Low"
            vol = 2100

        sector = "Sector B" if "024" in f.field_id else ("Sector A" if "087" in f.field_id else ("Sector C" if "041" in f.field_id else "Sector D"))
        driver = risk.risk_factors[0] if risk.risk_factors else f"Water stress {score}% in {f.growth_stage} stage"

        items.append({
            "field_id": f.field_id,
            "sector": sector,
            "crop": f.crop,
            "growth_stage": f.growth_stage,
            "urgency": urgency,
            "water_stress_score": score,
            "recommended_vol_m3": vol,
            "risk_driver": driver
        })

    # Sort fields by water_stress_score descending
    items.sort(key=lambda x: x["water_stress_score"], reverse=True)

    result = []
    for idx, item in enumerate(items, start=1):
        result.append(PriorityItem(
            rank=idx,
            field_id=item["field_id"],
            sector=item["sector"],
            crop=item["crop"],
            growth_stage=item["growth_stage"],
            urgency=item["urgency"],
            water_stress_score=item["water_stress_score"],
            recommended_vol_m3=item["recommended_vol_m3"],
            risk_driver=item["risk_driver"]
        ))

    return result
