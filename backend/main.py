from fastapi import FastAPI

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


app = FastAPI()


#home page endpoint
@app.get("/")
def root():
    return {"message": "Task tracker backend running"}


#get tasks endpoint
@app.get("/tasks")
def get_tasks():
    return tasks