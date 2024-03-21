import "./Task.sass";

interface TaskProps {
  hasButtons: boolean;
  hasVisibility: boolean;
  complete: boolean;
  title: string;
  description: string;
  status: string;
  visibility?: string;
  editBtn?: () => void;
  deleteBtn?: () => void;
}

const Task = ({
  hasButtons,
  hasVisibility,
  complete,
  title,
  description,
  status,
  visibility,
  editBtn,
  deleteBtn,
}: TaskProps) => {
  return (
    <article className="task">
      <div className="p-father">
        <p className={`${complete ? "complete" : ""}`}>{title}</p>
      </div>
      <div className="p-father">
        <p className={`${complete ? "complete" : ""}`}>{description}</p>
      </div>
      <div className="p-father">
        <p className={`${complete ? "complete" : ""}`}> {status}</p>
      </div>
      {hasVisibility && (
        <div className="p-father">
          <p className={`${complete ? "complete" : ""}`}>{visibility}</p>
        </div>
      )}

      {hasButtons && (
        <div className="buttons-actions">
          <button className="task-btn delet" onClick={deleteBtn}>
            delete
          </button>
          <button className="task-btn edit" onClick={editBtn}>
            edit
          </button>
        </div>
      )}
    </article>
  );
};

export default Task;
