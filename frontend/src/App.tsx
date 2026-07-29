import './App.css'
import Task from "./components/Task";
import { useState, useEffect } from 'react';


function App() {
  type Task = {
    id: number;
    title: string;
    completed: boolean;
  }

  //task list state
  const [tasks, setTasks] = useState<Task[]>([]);

  //send patch request to backend (toggle task completion)
  const toggleTask = async (id: number) => {
    const currentTask = tasks.find(task => task.id === id);
    if (!currentTask) {
      return;
    }
    const response = await fetch(
      `http://127.0.0.1:8000/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: currentTask.title,
          completed: !currentTask.completed,
        }),
      }
    );
    if (!response.ok) {
      console.error("Failed to toggle completion of task");
      return;
    }
    const taskResponse = await fetch("http://127.0.0.1:8000/tasks")
    const updatedTasks = await taskResponse.json()
    setTasks(updatedTasks);
  };

  //title input field state
  const [newTitle, setTitle] = useState('');

  // title input field event handler
  const newTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  // send post request to backend
  const addTask = async () => {
    //don't allow empty tasks
    if (newTitle.trim()) {
      const response = await fetch(
        "http://127.0.0.1:8000/tasks",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: newTitle,
                completed: false,
            }),
        }
      );
      const newTask = await response.json();
      //append newTask to tasks
      setTasks([...tasks, newTask]);
    }

    //clear the title input textfield
    setTitle('');
  }

  //send delete request to backend
  const deleteTask = async (id: number) => {
    const response = await fetch(
      `http://127.0.0.1:8000/tasks/${id}`,
      {
        method:"DELETE",
      }
    );
    if (!response.ok) {
      console.error("Failed to delete task")
    }
    const taskResponse = await fetch("http://127.0.0.1:8000/tasks")
    const updatedTasks = await taskResponse.json()
    setTasks(updatedTasks);
  }

  // send patch request to backend (edit task title)
  const saveTask = async (id: number, newTitle: string) => {
    const currentTask = tasks.find(task => task.id === id);
    if (!currentTask) {
      return;
    }
    const response = await fetch(
      `http://127.0.0.1:8000/tasks/${id}`,
      {
        method:"PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          completed: currentTask.completed,
        }),
      }
    );
    if (!response.ok) {
      console.error("Failed to save task");
      return;
    }
    const taskResponse = await fetch("http://127.0.0.1:8000/tasks")
    const updatedTasks = await taskResponse.json()
    setTasks(updatedTasks);
  };

  //after rendering the app, fetch tasks from backend and update tasklist
  useEffect(() => { fetch("http://127.0.0.1:8000/tasks") .then(response => response.json()) .then(data => { setTasks(data); }); }, []);

  //main application
  return (
    <main className="app">
      <h1>Task Tracker</h1>
      <h2>An application for managing your tasks</h2>
      {tasks.map(task => (
        <Task key={task.id} title={task.title} completed={task.completed} 
          onToggle={() => toggleTask(task.id)} 
          onDelete={() => deleteTask(task.id)}
          onSave={(newTitle) => saveTask(task.id, newTitle)}/>
      ))}
      <label htmlFor="new-task">New Task Title</label>
      <div className="addTask">
        <textarea
          id="new-task"
          value={newTitle}
          onChange={newTitleChange}
          placeholder="Enter new task title here..."
          rows={4}
          cols={70}
        />
        <button disabled={newTitle.trim() === ""} onClick={addTask}>Add Task</button>
      </div>
    </main>
  )
}

export default App