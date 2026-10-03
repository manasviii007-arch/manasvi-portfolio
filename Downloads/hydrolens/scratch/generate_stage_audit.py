import os
import sys
import time
import json
import urllib.request
import urllib.error
import threading

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import uvicorn
from backend.main import app
from backend.services.risk_engine import calculate_water_stress, calculate_risk_summary
from backend.models.field import Field

SERVER_HOST = "127.0.0.1"
SERVER_PORT = 8009  # using port 8009 to avoid any conflicts
BASE_URL = f"http://{SERVER_HOST}:{SERVER_PORT}"

def start_server():
    uvicorn.run(app, host=SERVER_HOST, port=SERVER_PORT, log_level="warning")

def run_audit():
    print("=" * 80)
    print("HYDROLENS BACKEND STAGE 3-21 COMPREHENSIVE AUDIT TEST SUITE")
    print("=" * 80)

    # Start Uvicorn background thread
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()

    # Wait for server readiness
    health_url = f"{BASE_URL}/api/health"
    ready = False
    for attempt in range(20):
        try:
            req = urllib.request.Request(health_url)
            with urllib.request.urlopen(req, timeout=1.0) as resp:
                if resp.status == 200:
                    ready = True
                    break
        except Exception:
            time.sleep(0.2)

    if not ready:
        print("ERROR: Server failed to start on port", SERVER_PORT)
        sys.exit(1)

    print(f"\n[+] Server active at {BASE_URL}\n")

    endpoints_to_test = [
        {"name": "Health Check", "path": "/api/health", "method": "GET", "expected_status": 200},
        {"name": "List All Fields", "path": "/api/fields", "method": "GET", "expected_status": 200},
        {"name": "Get Field 024", "path": "/api/fields/Field%20024", "method": "GET", "expected_status": 200},
        {"name": "Get Field 087", "path": "/api/fields/Field%20087", "method": "GET", "expected_status": 200},
        {"name": "Get Invalid Field (404 Test)", "path": "/api/fields/NonExistent999", "method": "GET", "expected_status": 404},
        {"name": "Risk Summary", "path": "/api/risk/summary", "method": "GET", "expected_status": 200},
        {"name": "Field Risk (Field 024)", "path": "/api/risk/Field%20024", "method": "GET", "expected_status": 200},
        {"name": "Field Recommendations", "path": "/api/recommendations/Field%20024", "method": "GET", "expected_status": 200},
        {
            "name": "Scenario Simulation",
            "path": "/api/simulation",
            "method": "POST",
            "body": {
                "available_water": 38000,
                "dry_spell_duration": 7,
                "temperature_anomaly": 3.5,
                "rainfall_probability": 15,
                "solar_availability": 6.2
            },
            "expected_status": 200
        },
        {"name": "Weather Forecast", "path": "/api/weather", "method": "GET", "expected_status": 200},
        {"name": "Priority Dispatch", "path": "/api/priority-dispatch", "method": "GET", "expected_status": 200},
        {"name": "System Alerts", "path": "/api/alerts", "method": "GET", "expected_status": 200},
        {"name": "Analytics Data", "path": "/api/analytics", "method": "GET", "expected_status": 200},
        {"name": "Solar Optimization", "path": "/api/solar-optimization", "method": "GET", "expected_status": 200}
    ]

    print("-" * 80)
    print("SECTION 1: ENDPOINT VERIFICATION RESULTS")
    print("-" * 80)
    
    passed_count = 0
    total_count = len(endpoints_to_test)
    
    results = []

    for ep in endpoints_to_test:
        url = f"{BASE_URL}{ep['path']}"
        method = ep["method"]
        body = ep.get("body")
        expected = ep["expected_status"]

        headers = {'Content-Type': 'application/json'} if body else {}
        data = json.dumps(body).encode('utf-8') if body else None
        req = urllib.request.Request(url, data=data, headers=headers, method=method)

        status_code = None
        response_body = None
        error_detail = None

        try:
            with urllib.request.urlopen(req) as resp:
                status_code = resp.status
                response_body = json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            status_code = e.code
            try:
                response_body = json.loads(e.read().decode())
            except Exception:
                response_body = str(e)
        except Exception as e:
            error_detail = str(e)

        is_pass = (status_code == expected)
        if is_pass:
            passed_count += 1

        res_summary = {
            "name": ep["name"],
            "method": method,
            "path": ep["path"],
            "expected_status": expected,
            "actual_status": status_code,
            "passed": is_pass,
            "response": response_body
        }
        results.append(res_summary)

        status_str = f"HTTP {status_code}" if status_code else f"FAILED ({error_detail})"
        pass_str = "PASS" if is_pass else "FAIL"
        print(f"[{pass_str}] {ep['name']:<30} | {method:<4} {ep['path']:<32} | Status: {status_str:<8} (Expected: {expected})")

    print(f"\nEndpoint Verification Summary: {passed_count}/{total_count} Passed Cleanly.\n")

    print("-" * 80)
    print("SECTION 2: RISK ENGINE VALIDATION & DETERMINISTIC MATH VERIFICATION")
    print("-" * 80)

    # Test cases for calculate_water_stress
    risk_test_cases = [
        {
            "desc": "Baseline / Normal Field Conditions",
            "soil_moisture": 35.0,
            "temperature": 28.0,
            "rainfall_probability": 40.0,
            "crop": "Corn",
            "growth_stage": "Vegetative",
            "ndvi": 0.82,
            "water_availability": 15000.0,
            "dry_spell_duration": 2
        },
        {
            "desc": "High Thermal & Dry Stress in Flowering Stage (Field 024 scenario)",
            "soil_moisture": 18.0,
            "temperature": 34.0,
            "rainfall_probability": 10.0,
            "crop": "Wheat",
            "growth_stage": "Flowering",
            "ndvi": 0.58,
            "water_availability": 12000.0,
            "dry_spell_duration": 7
        },
        {
            "desc": "Critical Low Moisture & Thermal Stress",
            "soil_moisture": 12.0,
            "temperature": 36.5,
            "rainfall_probability": 0.0,
            "crop": "Cotton",
            "growth_stage": "Grain Fill",
            "ndvi": 0.52,
            "water_availability": 8000.0,
            "dry_spell_duration": 10
        },
        {
            "desc": "Optimal Hydration with High Rain Relief",
            "soil_moisture": 45.0,
            "temperature": 25.0,
            "rainfall_probability": 80.0,
            "crop": "Soybeans",
            "growth_stage": "Vegetative",
            "ndvi": 0.88,
            "water_availability": 22000.0,
            "dry_spell_duration": 0
        }
    ]

    for idx, tc in enumerate(risk_test_cases, start=1):
        output = calculate_water_stress(
            soil_moisture=tc["soil_moisture"],
            temperature=tc["temperature"],
            rainfall_probability=tc["rainfall_probability"],
            crop=tc["crop"],
            growth_stage=tc["growth_stage"],
            ndvi=tc["ndvi"],
            water_availability=tc["water_availability"],
            dry_spell_duration=tc["dry_spell_duration"]
        )
        print(f"\nTest Case {idx}: {tc['desc']}")
        print(f"  Inputs: Moisture={tc['soil_moisture']}%, Temp={tc['temperature']}°C, RainProb={tc['rainfall_probability']}%, Stage={tc['growth_stage']}, DrySpell={tc['dry_spell_duration']}d, NDVI={tc['ndvi']}")
        print(f"  Output -> Stress Score: {output.water_stress_score} | Risk Category: {output.risk_category}")
        print(f"  Risk Factors ({len(output.risk_factors)}): {output.risk_factors}")

    print("\n" + "=" * 80)
    print("FULL AUDIT DATA SNAPSHOT (JSON):")
    print("=" * 80)
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    run_audit()
