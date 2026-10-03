from fastapi import APIRouter
from typing import List
from api.fields import load_fields
from services.priority_engine import calculate_priority_dispatch, PriorityItem

router = APIRouter()

@router.get("/api/priority-dispatch", response_model=List[PriorityItem])
async def get_priority_dispatch():
    fields = load_fields()
    return calculate_priority_dispatch(fields)
