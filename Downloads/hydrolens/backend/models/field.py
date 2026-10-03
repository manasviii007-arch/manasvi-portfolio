from pydantic import BaseModel, Field as PydanticField

class Field(BaseModel):
    field_id: str
    latitude: float = PydanticField(..., ge=-90.0, le=90.0)
    longitude: float = PydanticField(..., ge=-180.0, le=180.0)
    crop: str
    growth_stage: str
    soil_moisture: float = PydanticField(..., ge=0.0, le=100.0)
    temperature: float = PydanticField(..., ge=-50.0, le=60.0)
    rainfall_probability: float = PydanticField(..., ge=0.0, le=100.0)
    ndvi: float = PydanticField(..., ge=-1.0, le=1.0)
    water_availability: float = PydanticField(..., ge=0.0)
    solar_availability: float = PydanticField(..., ge=0.0)

