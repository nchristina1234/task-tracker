from fastapi import FastAPI
from models import Task, TaskDB
from database import engine, Base, SessionLocal

#create database tables if they don't exist
Base.metadata.create_all(bind=engine)


#task data
tasks = [
    {
        "id": 1,
        "title": "Learn FastAPI",
        "completed": False
    },
    {
        "id": 2,
        "title": "Create endpoints",
        "completed": False
    }
]


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
@app.post("/tasks")
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
        return {"message": f"New task with ID {new_task.id} has been created"}
    finally:
        db.close()

    


#get single task endpoint
@app.get("/tasks/{id}")
def get_one_task(id: int):
    for x in tasks:
        if x["id"] == id:
            return x
    #id not found
    return {"message": "A task with that ID does not exist"}


#update task endpoint
@app.patch("/tasks/{id}")
def update_task(id: int, task: Task):
    for currentTask in tasks:
        if currentTask["id"] == id:
            targetTask = currentTask
            break
    #id not found
    if targetTask is None:
        return {"message": "A task with that ID does not exist"}
    targetTask["title"] = task.title
    targetTask["completed"] = task.completed
    return {"message": f"Task with ID {id} has been updated"}

#delete task endpoint
@app.delete("/tasks/{id}")
def delete_task(id: int):
    for task in tasks:
        if task["id"] == id:
            targetTask = task
            tasks.remove(task)
            break
    if targetTask is None:
        return {"message": "A task with that ID does not exist"}
    else:
        return {"message": f"Task with ID {id} has been deleted"}
    




