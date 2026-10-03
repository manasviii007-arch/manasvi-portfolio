from fastapi import APIRouter
from services.solar_service import calculate_solar_optimization, SolarOptimizationOutput

router = APIRouter()

@router.get("/api/solar-optimization", response_model=SolarOptimizationOutput)
async def get_solar_optimization():
    return calculate_solar_optimization()
