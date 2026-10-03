from fastapi import APIRouter, HTTPException
from services.risk_engine import calculate_water_stress, calculate_risk_summary, RiskOutput, RiskSummaryOutput
from api.fields import load_fields

router = APIRouter()


def normalize_id(fid: str) -> str:
    return fid.lower().replace(" ", "").replace("-", "")

@router.get("/api/risk/summary", response_model=RiskSummaryOutput)
async def get_risk_summary():
    fields = load_fields()
    return calculate_risk_summary(fields)

@router.get("/api/risk/{field_id}", response_model=RiskOutput)
async def get_risk(field_id: str):
    fields = load_fields()
    norm_query = normalize_id(field_id)
    field = next((f for f in fields if normalize_id(f.field_id) == norm_query or norm_query in normalize_id(f.field_id)), None)
    
    if not field:
        raise HTTPException(status_code=404, detail=f"Field '{field_id}' not found")
        
    risk = calculate_water_stress(
        soil_moisture=field.soil_moisture,
        temperature=field.temperature,
        rainfall_probability=field.rainfall_probability,
        crop=field.crop,
        growth_stage=field.growth_stage,
        ndvi=field.ndvi,
        water_availability=field.water_availability,
        dry_spell_duration=7 # Default base assumption
    )
    
    return risk

