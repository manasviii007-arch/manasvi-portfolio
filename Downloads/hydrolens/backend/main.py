import os
import sys

# Add backend directory to sys.path for clean local module imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from api import fields, risk, recommendations, simulation, weather, priority, alerts, analytics, solar

app = FastAPI(title="HydroLens API")

app.include_router(fields.router)
app.include_router(risk.router)
app.include_router(recommendations.router)
app.include_router(simulation.router)
app.include_router(weather.router)
app.include_router(priority.router)
app.include_router(alerts.router)
app.include_router(analytics.router)
app.include_router(solar.router)


# Configure CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
async def serve_frontend():
    index_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "index.html")
    return FileResponse(index_path, media_type="text/html")

@app.get("/index.html", include_in_schema=False)
async def serve_frontend_index():
    index_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "index.html")
    return FileResponse(index_path, media_type="text/html")

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "HydroLens API"}

