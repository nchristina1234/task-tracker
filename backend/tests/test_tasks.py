from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Task tracker backend running"}

def test_get_all_tasks():
    response = client.get("/tasks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_task():
    task_data = {"title": "Test Task", "completed": False}
    response = client.post("/tasks", json=task_data)
    assert response.status_code == 201
    assert response.json()["title"] == task_data["title"]
    assert response.json()["completed"] == task_data["completed"]

def test_get_one_task():
    # First, create a task to ensure there is one to retrieve
    task_data = {"title": "Test Task", "completed": False}
    create_response = client.post("/tasks", json=task_data)
    task_id = create_response.json()["id"]

    # Now, retrieve the created task
    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["id"] == task_id
    assert response.json()["title"] == task_data["title"]
    assert response.json()["completed"] == task_data["completed"]