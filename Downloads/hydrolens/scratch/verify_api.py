from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)
for path in ['/api/health', '/api/fields', '/api/risk/summary']:
    response = client.get(path)
    print(path, response.status_code)
    print(response.json())
