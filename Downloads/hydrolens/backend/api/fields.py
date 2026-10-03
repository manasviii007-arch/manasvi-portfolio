import json
import os
from typing import List
from fastapi import APIRouter, HTTPException
from models.field import Field

router = APIRouter()

def load_fields() -> List[Field]:
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'fields.json')
    try:
        with open(data_path, 'r') as f:
            data = json.load(f)
            return [Field(**item) for item in data]
    except Exception as e:
        print(f"Error loading fields: {e}")
        return []

def normalize_id(fid: str) -> str:
    return fid.lower().replace(" ", "").replace("-", "")

@router.get("/api/fields", response_model=List[Field])
async def get_fields():
    fields = load_fields()
    return fields

@router.get("/api/fields/{field_id}", response_model=Field)
async def get_field(field_id: str):
    fields = load_fields()
    norm_query = normalize_id(field_id)
    for field in fields:
        if normalize_id(field.field_id) == norm_query or norm_query in normalize_id(field.field_id):
            return field
    raise HTTPException(status_code=404, detail=f"Field '{field_id}' not found")


