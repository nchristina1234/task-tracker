type TaskProps = {
    title: string;
    completed: boolean;
    onToggle: () => void;
    onDelete: () => void;
}

function Task({ title, completed, onToggle, onDelete }: TaskProps) {

  return (
    <div className="task">
      <div><button className="completeButton" onClick={onToggle}>{completed ? "✅" : "⬜"}</button></div>
      <div><p>{title}</p></div>
      <div><button className="deleteButton" onClick={onDelete}>Delete</button></div>
    </div>
  );
}

export default Task;