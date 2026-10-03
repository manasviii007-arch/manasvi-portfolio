import os
import sys
sys.path.insert(0, os.path.abspath('.'))

import urllib.request
import json
from backend.models.field import Field
from pydantic import ValidationError


def test_stage2():
    # 1. Test GET /api/fields
    url_all = "http://127.0.0.1:8000/api/fields"
    res = urllib.request.urlopen(url_all)
    assert res.status == 200
    fields_data = json.loads(res.read().decode())
    assert len(fields_data) == 5, f"Expected 5 fields, got {len(fields_data)}"
    print(f"PASS: GET /api/fields returned HTTP 200 with {len(fields_data)} fields.")

    # 2. Test schema validation for every field
    required_fields = [
        "field_id", "latitude", "longitude", "crop", "growth_stage",
        "soil_moisture", "temperature", "rainfall_probability",
        "ndvi", "water_availability", "solar_availability"
    ]
    for item in fields_data:
        # Validate Pydantic model
        validated_field = Field(**item)
        for key in required_fields:
            assert hasattr(validated_field, key), f"Missing key {key}"
        print(f"  Verified field '{validated_field.field_id}' ({validated_field.crop}, stage: {validated_field.growth_stage})")

    # 3. Test GET /api/fields/Field%20024
    url_single = "http://127.0.0.1:8000/api/fields/Field%20024"
    res2 = urllib.request.urlopen(url_single)
    assert res2.status == 200
    field_24 = json.loads(res2.read().decode())
    assert field_24["field_id"] == "Field 024"
    assert field_24["crop"] == "Wheat"
    print(f"PASS: GET /api/fields/Field%20024 returned HTTP 200 for {field_24['field_id']}.")

    # 4. Test GET /api/fields/Field%20087
    url_single_87 = "http://127.0.0.1:8000/api/fields/Field%20087"
    res3 = urllib.request.urlopen(url_single_87)
    assert res3.status == 200
    field_87 = json.loads(res3.read().decode())
    assert field_87["field_id"] == "Field 087"
    print(f"PASS: GET /api/fields/Field%20087 returned HTTP 200 for {field_87['field_id']}.")

    # 5. Test Invalid Field ID (404 Error handling)
    url_invalid = "http://127.0.0.1:8000/api/fields/InvalidField999"
    try:
        urllib.request.urlopen(url_invalid)
        assert False, "Expected HTTP 404 error"
    except urllib.error.HTTPError as e:
        assert e.code == 404
        err_body = json.loads(e.read().decode())
        print(f"PASS: GET /api/fields/InvalidField999 returned HTTP 404 with detail: {err_body}")

    # 6. Test Pydantic Validation Rejection for Out-of-Bound Data
    invalid_data = {
        "field_id": "Invalid 001",
        "latitude": 120.0, # Out of bound > 90
        "longitude": -119.78,
        "crop": "Wheat",
        "growth_stage": "Flowering",
        "soil_moisture": 150.0, # Out of bound > 100
        "temperature": 34.0,
        "rainfall_probability": 16.0,
        "ndvi": 2.5, # Out of bound > 1
        "water_availability": -50.0, # Out of bound < 0
        "solar_availability": 6.2
    }
    try:
        Field(**invalid_data)
        assert False, "Pydantic failed to reject invalid bounds"
    except ValidationError as ve:
        print(f"PASS: Pydantic correctly rejected invalid bounds with {len(ve.errors())} validation errors.")

    print("\n>>> ALL STAGE 2 TESTS PASSED SUCCESSFULLY! <<<")

if __name__ == "__main__":
    test_stage2()
