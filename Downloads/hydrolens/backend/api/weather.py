from fastapi import APIRouter
from services.weather_service import get_weather_forecast, WeatherOutput

router = APIRouter()

@router.get("/api/weather", response_model=WeatherOutput)
async def get_weather(lat: float = 36.81, lng: float = -119.78):
    return get_weather_forecast(lat, lng)
