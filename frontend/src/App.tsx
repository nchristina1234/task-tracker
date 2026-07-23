import './App.css'
import Task from "./components/Task";
import { useState } from 'react';


function App() {
  type Task = {
    id: number;
    title: string;
    completed: boolean;
  }

  //task list state
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Connect FastAPI", completed: true },
    { id: 3, title: "Build UI", completed: false },
    { id: 4, title: "Fourth Task", completed: true },
    { id: 5, title: "Last Task", completed: false}
  ]);

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

  const addTask = () => {
    //don't allow empty tasks
    if (newTitle.trim()) {
      //create a new task object
      const newTask: Task = {
        id: tasks.length + 1,
        title: newTitle,
        completed: false
      };
      //append it to tasks
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