type TaskProps = {
    title: string;
    completed: boolean;
    onToggle: () => void;
}

function Task({ title, completed, onToggle }: TaskProps) {

  return (
    <div className="task">
      <button className="completeButton" onClick={onToggle}>{completed ? "✅" : "⬜"}</button>
      <p>{title}</p>   
    </div>
  );
}

export default Task;