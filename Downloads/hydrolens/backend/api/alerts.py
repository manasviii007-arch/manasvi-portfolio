from fastapi import APIRouter
from typing import List
from api.fields import load_fields
from services.alert_engine import generate_system_alerts, AlertItem

router = APIRouter()

@router.get("/api/alerts", response_model=List[AlertItem])
async def get_alerts():
    fields = load_fields()
    return generate_system_alerts(fields)
