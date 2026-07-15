# Task Tracker

A full-stack task tracking application featuring a RESTful API with persistent SQL storage, and a React + TypeScript frontend.

## Features

- RESTful API with full CRUD functionality built with FastAPI
- Persistent task storage using PostgreSQL
- SQLAlchemy ORM for mapping between Python objects and SQL tables
- Automated API testing with pytest
- React + TypeScript frontend application (in development)

## Technologies

### Backend
- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- PostgreSQL
- pytest
- pytest-cov

### Frontend
- React
- TypeScript
- Vite
- HTML
- CSS
- JavaScript

## Running the Project

### Backend Setup
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

### Frontend Setup
1. Change to the frontend directory.
2. Install frontend dependencies:
```bash
npm install
```
3. Start the React development server:
```bash
npm run dev
```
4. Open the frontend application at:
```text
http://localhost:5173/
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


## Running Tests

The application uses `pytest` for automated API testing and `pytest-cov` for measuring test coverage.

From the `backend` directory, this will run all automated API tests:

```bash
python -m pytest
```

To run tests with coverage reporting:

```bash
python -m pytest --cov=. --cov-report=term-missing
```

