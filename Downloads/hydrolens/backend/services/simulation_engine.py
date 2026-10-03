from pydantic import BaseModel, Field as PydanticField

class SimulationInput(BaseModel):
    available_water: float = PydanticField(38000, ge=10000, le=60000)
    dry_spell_duration: int = PydanticField(7, ge=1, le=21)
    temperature_anomaly: float = PydanticField(3.5, ge=0.0, le=8.0)
    rainfall_probability: float = PydanticField(15.0, ge=0.0, le=100.0)
    solar_availability: float = PydanticField(6.2, ge=2.0, le=9.0)

class StrategyOutcome(BaseModel):
    critical_fields_count: int
    est_yield_loss_percent: float

class SimulationOutput(BaseModel):
    overall_risk: str
    traditional_strategy: StrategyOutcome
    ai_strategy: StrategyOutcome
    water_efficiency_score: float
    pumping_energy_kwh: float
    solar_sync_efficiency: float
    recommended_strategy_text: str

def run_simulation_matrix(input_data: SimulationInput, fields_count: int = 42) -> SimulationOutput:
    water = input_data.available_water
    dry = input_data.dry_spell_duration
    temp = input_data.temperature_anomaly
    rain = input_data.rainfall_probability
    solar = input_data.solar_availability

    # Calculation logic for simulation matrix
    base_stress = (temp * 2.5) + (dry * 1.8) - (rain * 0.2) - (water / 4000.0)
    base_stress = max(5.0, min(95.0, base_stress))

    if base_stress > 65:
        overall_risk = "High Risk"
    elif base_stress > 45:
        overall_risk = "Moderate Risk"
    else:
        overall_risk = "Low Risk"

    # Traditional Strategy (Uniform allocation)
    trad_critical = min(fields_count, max(2, int(round((temp * 2.2 + dry * 1.6) - (water / 5500.0)))))
    trad_yield_loss = round(min(45.0, max(2.0, trad_critical * 1.35)), 1)

    # HydroLens AI Strategy (Risk-prioritized allocation)
    ai_critical = max(1, int(round(trad_critical * 0.15)))
    ai_yield_loss = round(trad_yield_loss * 0.18, 1)

    # Efficiency Metrics
    water_eff = round(min(98.5, max(60.0, 85.0 + (solar * 1.5) - (temp * 0.8))), 1)
    energy_kwh = round(max(80.0, (water / 220.0) + (temp * 4.5)), 1)
    solar_sync = round(min(99.0, max(50.0, (solar / 7.0) * 92.0)), 1)

    strategy_text = (
        f"Shift 40% of standard volume away from low-stress vegetative parcels towards "
        f"flowering crops during peak solar window (11:30 AM – 01:15 PM). "
        f"This maximizes photosynthetic water use efficiency and avoids burning fuel."
    )

    return SimulationOutput(
        overall_risk=overall_risk,
        traditional_strategy=StrategyOutcome(
            critical_fields_count=trad_critical,
            est_yield_loss_percent=trad_yield_loss
        ),
        ai_strategy=StrategyOutcome(
            critical_fields_count=ai_critical,
            est_yield_loss_percent=ai_yield_loss
        ),
        water_efficiency_score=water_eff,
        pumping_energy_kwh=energy_kwh,
        solar_sync_efficiency=solar_sync,
        recommended_strategy_text=strategy_text
    )
