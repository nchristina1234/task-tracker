# Task Tracker

A backend task tracking application featuring a RESTful API with persistent SQL storage and full CRUD functionality.

## Features

- RESTful CRUD API built with FastAPI
- Persistent task storage using SQLite
- SQLAlchemy ORM for mapping between Python objects and SQL tables

## Technologies

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- SQLite

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
    - Returns all tasks
- POST /tasks
    - Creates a new task from client JSON input
- GET /tasks/{id}
    - Returns the task with the client ID input
- PATCH /tasks/{id}
    - Updates the task with the client ID input
- DELETE /tasks/{id}
    - Deletes the task with the client ID input
