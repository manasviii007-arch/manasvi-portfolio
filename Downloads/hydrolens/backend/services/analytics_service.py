from pydantic import BaseModel
from typing import List
from services.risk_engine import calculate_water_stress

class AnalyticsOutput(BaseModel):
    trend_labels: List[str]
    trend_data: List[float]
    sector_labels: List[str]
    sector_demand: List[float]
    sector_supply: List[float]

def calculate_analytics_data(fields: List) -> AnalyticsOutput:
    if not fields:
        return AnalyticsOutput(
            trend_labels=['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            trend_data=[32.0, 45.0, 62.0, 74.0],
            sector_labels=['Sector A', 'Sector B', 'Sector C', 'Sector D'],
            sector_demand=[12000.0, 15000.0, 9000.0, 8000.0],
            sector_supply=[10000.0, 14000.0, 9000.0, 8000.0]
        )

    # Compute average stress score
    total_stress = 0.0
    for f in fields:
        r = calculate_water_stress(
            soil_moisture=f.soil_moisture,
            temperature=f.temperature,
            rainfall_probability=f.rainfall_probability,
            crop=f.crop,
            growth_stage=f.growth_stage,
            ndvi=f.ndvi,
            water_availability=f.water_availability,
            dry_spell_duration=7
        )
        total_stress += r.water_stress_score

    avg_stress = total_stress / len(fields)
    
    # Generate 4-week trend ending at current avg_stress
    w4 = round(avg_stress, 1)
    w3 = round(max(10.0, avg_stress * 0.84), 1)
    w2 = round(max(10.0, avg_stress * 0.61), 1)
    w1 = round(max(10.0, avg_stress * 0.43), 1)

    return AnalyticsOutput(
        trend_labels=['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        trend_data=[w1, w2, w3, w4],
        sector_labels=['Sector A', 'Sector B', 'Sector C', 'Sector D'],
        sector_demand=[12000.0, 15000.0, 9000.0, 8000.0],
        sector_supply=[10000.0, 14000.0, 9000.0, 8000.0]
    )
