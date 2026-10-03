from fastapi import APIRouter, HTTPException
from api.fields import load_fields
from services.recommendation_engine import generate_recommendation, RecommendationOutput

router = APIRouter()

def normalize_id(fid: str) -> str:
    return fid.lower().replace(" ", "").replace("-", "")

@router.get("/api/recommendations/{field_id}", response_model=RecommendationOutput)
async def get_recommendation(field_id: str):
    fields = load_fields()
    norm_query = normalize_id(field_id)
    field = next((f for f in fields if normalize_id(f.field_id) == norm_query or norm_query in normalize_id(f.field_id)), None)
    
    if not field:
        raise HTTPException(status_code=404, detail=f"Field '{field_id}' not found")
        
    return generate_recommendation(field)
