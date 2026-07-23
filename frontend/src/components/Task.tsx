import { useState } from 'react';

type TaskProps = {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onSave: (newTitle: string) => void;
}

function Task({ title, completed, onToggle, onDelete, onSave }: TaskProps) {
  //boolean state for editing/not editing
  const [editing, setEditing] = useState(false);

  //string state for current title typed into textfield
  const [editedTitle, setEditedTitle] = useState(title);

  //event handler for changes in editedTitle
  const editedTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleSave = () => {
    if (editedTitle.trim() === "") {
      return;
    }
    onSave(editedTitle);
    setEditing(false);
  };

  return (
    <div className="task">
      <div>
        <button className="completeButton" onClick={onToggle}>{completed ? "✅" : "⬜"}</button></div>
        <div>
          {editing ? (<input type="text" defaultValue={title} value={editedTitle} onChange={editedTitleChange}/>) : 
            (<p>{title}</p>)}
        </div>
      <div>
        {editing ? (<button className="saveButton" onClick={handleSave}>Save</button>) : 
          (<button className="editButton" onClick={() => setEditing(true)}>Edit</button>)}
        <button className="deleteButton" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Task;

