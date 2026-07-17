type TaskProps = {
    title: string
}

function Task({ title }: TaskProps) {
  return (
    <div className="task">
        <p>{title}</p>
    </div>
  );
}

export default Task;