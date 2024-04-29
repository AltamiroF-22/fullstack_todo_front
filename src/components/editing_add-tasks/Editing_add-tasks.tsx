import { useState, useRef } from "react";
import "./Editing_add-tasks.sass";
import { EditingAddTasksProps } from "./Editing_add-tasks_Interface";

const EditingAddTasks = (props: EditingAddTasksProps) => {
  const [visibility, setVisibility] = useState<string>("public");
  const [status, setStatus] = useState<string>("not_started");
  const [erroMsg, setErroMsg] = useState<string>("");
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setVisibility(event.target.value);
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const title = titleRef.current?.value.trim() ?? "";
    const description = descriptionRef.current?.value.trim() ?? "";

    if (title.length === 0 || description.length === 0) {
      setErroMsg("The fields can't be empyt!");
      return;
    }

    setErroMsg("");

    const formData = {
      title: title,
      description: description,
      visibility: visibility,
      status: status,
    };

    props.onSubmit(formData);
  };

  return (
    <main className="background-blur">
      <section className="pop-up">
        <nav>
          <ul>
            <li>{props.popUpTitle}</li>
            <li className="close-pop-up" onClick={props.closePopUp}>
              x
            </li>
          </ul>
        </nav>
        <form method={props.method} onSubmit={handleSubmit}>
          <div className="form-up">
            <small className="erros">{erroMsg}</small>
            <input
              ref={titleRef}
              defaultValue={props.defaultTitle}
              type="text"
              placeholder="title:"
            />
            <input
              defaultValue={props.defaultDescription}
              ref={descriptionRef}
              type="text"
              placeholder="description:"
            />
          </div>
          <div className="form-bottom">
            <div className="radio-inputs">
              <p>Visibility:</p>

              <input
                type="radio"
                name="visibility"
                id="public"
                value="public"
                checked={visibility === "public"}
                onChange={handleVisibilityChange}
              />
              <label htmlFor="public">Public</label>

              <input
                type="radio"
                name="visibility"
                id="private"
                value="private"
                checked={visibility === "private"}
                onChange={handleVisibilityChange}
              />
              <label htmlFor="private">Private</label>
            </div>

            <div className="radio-inputs">
              <p>Status:</p>

              <input
                type="radio"
                name="status"
                id="not_started"
                value="not_started"
                checked={status === "not_started"}
                onChange={handleStatusChange}
              />
              <label htmlFor="not_started">Not Started</label>
              <input
                type="radio"
                name="status"
                id="in_progress"
                value="in_progress"
                checked={status === "in_progress"}
                onChange={handleStatusChange}
              />
              <label htmlFor="in_progress">In Progress</label>
              <input
                type="radio"
                name="status"
                id="completed"
                value="completed"
                checked={status === "completed"}
                onChange={handleStatusChange}
              />
              <label htmlFor="completed">Completed</label>
            </div>

            {props.defaultDescription && props.defaultTitle && (
              <>
                <p>
                  title: <span> {props.defaultTitle}</span>
                </p>
                <p>
                  description: <span>{props.defaultDescription}</span>
                </p>
              </>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
};

export default EditingAddTasks;
