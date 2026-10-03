from fastapi import APIRouter
from services.simulation_engine import SimulationInput, SimulationOutput, run_simulation_matrix
from api.fields import load_fields

router = APIRouter()

@router.post("/api/simulation", response_model=SimulationOutput)
async def post_simulation(input_data: SimulationInput):
    fields = load_fields()
    count = len(fields) if fields else 42
    return run_simulation_matrix(input_data, fields_count=count)
