type TaskProps = {
    title: string;
    completed: boolean;
    onToggle: () => void;
}

function Task({ title, completed, onToggle }: TaskProps) {

  return (
    <div className="task">
      <button onClick={onToggle}>{completed ? "✅" : "⬜"}</button>
      <p>{title}</p>   
    </div>
  );
}

export default Task;