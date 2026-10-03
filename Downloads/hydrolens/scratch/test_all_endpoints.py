import os
import sys
sys.path.insert(0, os.path.abspath('.'))

import urllib.request
import json

BASE_URL = "http://127.0.0.1:8000"

def test_endpoint(path, method="GET", body=None):
    url = f"{BASE_URL}{path}"
    headers = {'Content-Type': 'application/json'} if body else {}
    data = json.dumps(body).encode('utf-8') if body else None
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 200, f"Expected 200 for {path}, got {resp.status}"
        res_json = json.loads(resp.read().decode())
        print(f"SUCCESS [{method}] {path} -> HTTP 200")
        return res_json

def run_all_tests():
    print("--- TESTING ALL BACKEND ENDPOINTS ---")
    test_endpoint("/api/health")
    test_endpoint("/api/fields")
    test_endpoint("/api/fields/Field%20024")
    test_endpoint("/api/risk/summary")
    test_endpoint("/api/risk/Field%20024")
    test_endpoint("/api/recommendations/Field%20024")
    
    sim_body = {
        "available_water": 38000,
        "dry_spell_duration": 7,
        "temperature_anomaly": 3.5,
        "rainfall_probability": 15,
        "solar_availability": 6.2
    }
    test_endpoint("/api/simulation", method="POST", body=sim_body)
    test_endpoint("/api/weather")
    test_endpoint("/api/priority-dispatch")
    test_endpoint("/api/alerts")
    test_endpoint("/api/analytics")
    test_endpoint("/api/solar-optimization")
    print(">>> ALL 12 BACKEND API ENDPOINTS PASSED CLEANLY! <<<")

if __name__ == "__main__":
    run_all_tests()
