import './App.css'
import Task from "./components/Task";
import { useState } from 'react';


function App() {
  type Task = {
    id: number;
    title: string;
    completed: boolean;
  }

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Connect FastAPI", completed: true },
    { id: 3, title: "Build UI", completed: false },
    { id: 4, title: "Fourth Task", completed: true },
    { id: 5, title: "Last Task", completed: false}
  ]);

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

  return (
    <div className="app">
      <h1>Task Tracker</h1>
      <h2>An application for managing your tasks</h2>
      {tasks.map(task => (
        <Task key={task.id} title={task.title} completed={task.completed} onToggle={() => toggleTask(task.id)}/>
      ))}
      
      <button>Add Task</button>
    </div>
  )
}

export default App