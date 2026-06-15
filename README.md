# Task Tracker

A task tracker backend built with FastAPI

## Technologies

- Python
- FastAPI
- Uvicorn

## Running the Project

1. Change to the backend directory
2. Activate the virtual environment (venv)
3. Start the FastAPI server

```bash
uvicorn main:app --reload
```

## Current Endpoints

- GET /
    - Returns {"message":"Task tracker backend running"}
- GET /tasks
    - Returns a list of tasks
- POST /tasks
    - Accepts task data in JSON format, creates a new task, and appends it to the task list
- GET /tasks/{id}
    - Returns the task with the specified ID
- PATCH /tasks/{id}
    - Updates the task with the specified ID using client-provided JSON data
