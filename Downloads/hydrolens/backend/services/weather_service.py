import urllib.request
import json
from pydantic import BaseModel
from typing import List

class DailyWeather(BaseModel):
    day: str
    temp_max: float
    rain_prob: float
    is_alert: bool = False

class WeatherOutput(BaseModel):
    location: str
    source: str
    current_temp: float
    dry_spell_days: int
    evapotranspiration_increase: float
    forecast: List[DailyWeather]

def get_weather_forecast(lat: float = 36.81, lng: float = -119.78) -> WeatherOutput:
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&daily=temperature_2m_max,precipitation_probability_max&timezone=auto"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'HydroLens/1.0'})
        with urllib.request.urlopen(req, timeout=3.0) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                daily = data.get('daily', {})
                temps = daily.get('temperature_2m_max', [])
                rains = daily.get('precipitation_probability_max', [])
                
                day_names = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon']
                forecast_list = []
                for i in range(min(4, len(temps))):
                    t = temps[i]
                    r = rains[i] if i < len(rains) and rains[i] is not None else 10.0
                    forecast_list.append(DailyWeather(
                        day=day_names[i % len(day_names)],
                        temp_max=round(t, 1),
                        rain_prob=round(r, 1),
                        is_alert=(t >= 35.0)
                    ))
                
                return WeatherOutput(
                    location="Sector B4 - Central Valley Basin",
                    source="Open-Meteo (Live Data)",
                    current_temp=round(temps[0], 1) if temps else 32.0,
                    dry_spell_days=7,
                    evapotranspiration_increase=22.0,
                    forecast=forecast_list
                )
    except Exception as e:
        print(f"Open-Meteo fetch failed/timed out, using fallback: {e}")

    # Fallback Demo Weather Data
    fallback_forecast = [
        DailyWeather(day="Tue", temp_max=32.0, rain_prob=10.0, is_alert=False),
        DailyWeather(day="Wed", temp_max=34.0, rain_prob=0.0, is_alert=False),
        DailyWeather(day="Thu", temp_max=36.0, rain_prob=0.0, is_alert=True),
        DailyWeather(day="Fri", temp_max=33.0, rain_prob=5.0, is_alert=False),
    ]
    return WeatherOutput(
        location="Sector B4 - Central Valley Basin",
        source="HydroLens Weather Service (Fallback Data)",
        current_temp=32.0,
        dry_spell_days=7,
        evapotranspiration_increase=22.0,
        forecast=fallback_forecast
    )
