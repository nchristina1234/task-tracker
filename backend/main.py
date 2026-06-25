from fastapi import FastAPI, HTTPException
from models import Task, TaskDB
from database import engine, Base, SessionLocal

#create database tables if they don't exist
Base.metadata.create_all(bind=engine)


#initial app
app = FastAPI()


#home page endpoint
@app.get("/")
def home():
    return {"message": "Task tracker backend running"}


#get all tasks endpoint
@app.get("/tasks")
def get_all_tasks():
    db = SessionLocal()
    try:
        tasks = db.query(TaskDB).all()
        return tasks
    finally:
        db.close()


#create task endpoint
@app.post("/tasks",status_code=201)
def create_task(task: Task):
    db = SessionLocal()
    try:
        new_task = TaskDB(
            title=task.title,
            completed=task.completed
        )
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task
    finally:
        db.close()


#get single task endpoint
@app.get("/tasks/{id}")
def get_one_task(id: int):
    db = SessionLocal()
    try:
        task = db.query(TaskDB).filter(TaskDB.id == id).first()
        if not task:
            raise HTTPException(status_code=404, detail=f"Task with ID {id} not found")
        else:
            return task
    finally:
        db.close()


#update task endpoint
@app.patch("/tasks/{id}")
def update_task(id: int, task: Task):
    db = SessionLocal()
    try:
        targetTask = db.query(TaskDB).filter(TaskDB.id == id).first()
        if not targetTask:
            raise HTTPException(status_code=404, detail=f"Task with ID {id} not found")
        else:
            targetTask.title = task.title
            targetTask.completed = task.completed
            db.commit()
            db.refresh(targetTask)
            return targetTask
    finally:
        db.close()


#delete task endpoint
@app.delete("/tasks/{id}",status_code=204)
def delete_task(id: int):
    db = SessionLocal()
    try:
        task = db.query(TaskDB).filter(TaskDB.id == id).first()
        if not task:
            raise HTTPException(status_code=404, detail=f"Task with ID {id} not found")
        else:
            db.delete(task)
            db.commit()
    finally:
        db.close()




