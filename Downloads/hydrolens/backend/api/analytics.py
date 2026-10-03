from fastapi import APIRouter
from api.fields import load_fields
from services.analytics_service import calculate_analytics_data, AnalyticsOutput

router = APIRouter()

@router.get("/api/analytics", response_model=AnalyticsOutput)
async def get_analytics():
    fields = load_fields()
    return calculate_analytics_data(fields)
