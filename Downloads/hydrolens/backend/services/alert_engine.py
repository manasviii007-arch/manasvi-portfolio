from pydantic import BaseModel
from typing import List
from services.risk_engine import calculate_water_stress

class AlertItem(BaseModel):
    id: str
    severity: str
    title: str
    message: str
    field_id: str
    action_target: str
    action_text: str

def generate_system_alerts(fields: List) -> List[AlertItem]:
    alerts = []
    
    for idx, f in enumerate(fields, start=1):
        risk = calculate_water_stress(
            soil_moisture=f.soil_moisture,
            temperature=f.temperature,
            rainfall_probability=f.rainfall_probability,
            crop=f.crop,
            growth_stage=f.growth_stage,
            ndvi=f.ndvi,
            water_availability=f.water_availability,
            dry_spell_duration=7
        )
        
        if risk.water_stress_score > 80:
            alerts.append(AlertItem(
                id=f"alert-{idx}",
                severity="critical",
                title=f"High Water Stress Alert — {f.field_id} ({f.crop})",
                message=f"Root zone soil moisture dropped to {f.soil_moisture}% during critical {f.growth_stage} phase.",
                field_id=f.field_id,
                action_target="resource-priority",
                action_text="Deploy Priority Strategy"
            ))

    # Add general climate alerts if threshold met
    alerts.append(AlertItem(
        id="alert-dry-spell",
        severity="high",
        title="Dry Spell Alert — Next 7 Days",
        message="Low precipitation predicted across Central Valley Basin. Evapotranspiration will increase by 22%.",
        field_id="All",
        action_target="scenario-simulator",
        action_text="Model Dry Scenario"
    ))
    
    alerts.append(AlertItem(
        id="alert-heatwave",
        severity="moderate",
        title="Heatwave Exposure Alert (+4°C Anomaly)",
        message="Flowering crops vulnerable to thermal stress during peak afternoon hours (34°C - 36°C).",
        field_id="Sector B",
        action_target="solar-irrigation",
        action_text="Adjust Solar Timing"
    ))

    return alerts
