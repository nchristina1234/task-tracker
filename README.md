# Task Tracker

A backend task tracking application featuring a RESTful API with persistent SQL storage and full CRUD functionality.

## Features

- RESTful CRUD API built with FastAPI
- Persistent task storage using PostgreSQL
- SQLAlchemy ORM for mapping between Python objects and SQL tables

## Technologies

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- PostgreSQL

## Running the Project

1. Clone the repository.
2. Change to the backend directory.
3. Create and activate a virtual environment.
4. Install the project dependencies (from requirements.txt)
```bash
pip install -r requirements.txt
```
5. Create a PostgreSQL database (e.g., `taskdb`).
6. Create a `.env` file in the project root and add:

```text
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/taskdb
```

7. Start the FastAPI server:

```bash
uvicorn main:app --reload
```
8. Open the interactive Swagger API documentation at:

```
http://127.0.0.1:8000/docs
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
