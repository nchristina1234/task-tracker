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

def test_update_task():
    # Create a task to ensure there is one to update
    task_data = {"title": "Test Task", "completed": False}
    create_response = client.post("/tasks", json=task_data)
    task_id = create_response.json()["id"]

    # Update the created task
    new_data = {"title": "Test Task", "completed": True}
    response = client.patch(f"/tasks/{task_id}", json=new_data)
    assert response.status_code == 200
    assert response.json()["id"] == task_id
    assert response.json()["title"] == new_data["title"]
    assert response.json()["completed"] == new_data["completed"]

def test_delete_task():
    # Create a task to ensure there is one to delete
    task_data = {"title": "Test Task", "completed": False}
    create_response = client.post("/tasks", json=task_data)
    task_id = create_response.json()["id"]

    # Delete the created task
    delete_response = client.delete(f"/tasks/{task_id}")
    assert delete_response.status_code == 204

    # Attempt to retrieve deleted task
    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == 404
    assert response.json() == {"detail": f"Task with ID {task_id} not found"}

def test_update_nonexistent_task():
    # Create a task to ensure there is one to delete
    task_data = {"title": "Test Task", "completed": False}
    create_response = client.post("/tasks", json=task_data)
    task_id = create_response.json()["id"]

    # Delete the created task
    delete_response = client.delete(f"/tasks/{task_id}")
    assert delete_response.status_code == 204

    # Attempt to update the nonexistent_task
    new_data = {"title": "Test Task", "completed": True}
    response = client.patch(f"/tasks/{task_id}", json=new_data)
    assert response.status_code == 404
    assert response.json() == {"detail": f"Task with ID {task_id} not found"}
