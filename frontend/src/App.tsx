import './App.css'
import Task from "./components/Task";

function App() {
  type Task = {
    id: number;
    title: string;
    completed: boolean;
  }

  const tasks: Task[] = [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Connect FastAPI", completed: false },
    { id: 3, title: "Build UI", completed: false },
    { id: 4, title: "Fourth Task", completed: false },
    { id: 5, title: "Last Task", completed: false}
  ];

  return (
    <div className="app">
      <h1>Task Tracker</h1>
      <h2>An application for managing your tasks</h2>
      {tasks.map(task => (
        <Task key={task.id} title={task.title}/>
      ))}
      
      <button>Add Task</button>
    </div>
  )
}

export default App