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

  //toggle completion of a task
  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  //title input field state
  const [newTitle, setTitle] = useState('');

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

  //delete a task
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  //save a task
  const saveTask = (id: number, newTitle: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          title: newTitle,
        };
      }
      return task;
    });
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