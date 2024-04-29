import "./Task.sass";
import { TaskProps } from "./Task_Interface";

const Task = (props: TaskProps) => {
  return (
    <article className="task">
      <div className="p-father">
        <p className={`${props.complete ? "complete" : ""}`}>{props.title}</p>
      </div>
      <div className="p-father">
        <p className={`${props.complete ? "complete" : ""}`}>
          {props.description}
        </p>
      </div>
      <div className="p-father">
        <p className={`${props.complete ? "complete" : ""}`}> {props.status}</p>
      </div>

      {props.hasVisibility && (
        <div className="p-father">
          <p className={`${props.complete ? "complete" : ""}`}>
            {props.visibility}
          </p>
        </div>
      )}

      {props.hasButtons && (
        <div className="buttons-actions">
          <button className="task-btn delet" onClick={props.deleteBtn}>
            delete
          </button>
          <button className="task-btn edit" onClick={props.editBtn}>
            edit
          </button>
        </div>
      )}
    </article>
  );
};

export default Task;
