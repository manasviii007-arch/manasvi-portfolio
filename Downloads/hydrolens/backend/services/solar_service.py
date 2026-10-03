from pydantic import BaseModel
from typing import List

class SolarOptimizationOutput(BaseModel):
    hourly_labels: List[str]
    solar_irradiance: List[float]
    crop_transpiration_demand: List[float]
    optimal_pumping_window: str
    diesel_avoided_liters: float
    solar_energy_generated_kwh: float
    pumping_efficiency_percent: float
    co2_offset_kg: float

def calculate_solar_optimization() -> SolarOptimizationOutput:
    return SolarOptimizationOutput(
        hourly_labels=['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
        solar_irradiance=[0.2, 1.8, 4.2, 6.4, 5.8, 2.9, 0.4],
        crop_transpiration_demand=[0.5, 2.1, 5.0, 6.8, 6.1, 3.2, 0.8],
        optimal_pumping_window="11:30 AM – 1:15 PM",
        diesel_avoided_liters=48.5,
        solar_energy_generated_kwh=142.0,
        pumping_efficiency_percent=96.4,
        co2_offset_kg=128.0
    )
