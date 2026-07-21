type TaskProps = {
    title: string;
    completed: boolean;
}

function Task({ title, completed }: TaskProps) {

  return (
    <div className="task">
      {completed ? "✅" : "⬜"}
      <p>{title}</p>   
    </div>
  );
}

export default Task;