import "./UserTasks.sass";
import Task from "../task/Task";
import DeletePopUp from "../delete- pop-up/DeletePopUp";
import EditingAddTasks from "../editing_add-tasks/Editing_add-tasks";
import LoadingSvg from "../../assets/svg/loader.svg";
import { DefaultGIFs } from "../../assets/default_GIFs/data/defaultsGifs";
import { api } from "../../services/api";
import { useEffect, useState } from "react";

interface TasksProps {
  _id: string;
  title: string;
  description: string;
  status: string;
  visibility?: string;
}

const UserTasks = () => {
  const [userId, setUserId] = useState<string>("");
  const [userTasks, setUserTasks] = useState<TasksProps[]>([]);
  const [showAddPopUp, setShowAddPopUp] = useState<boolean>(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState<boolean>(false);
  const [showEditingPopUp, setShowEditingPopUp] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [defaultTitle, setDefaultTitle] = useState<string>("");
  const [defaultDescription, setDefaultDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    loadUserTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // load user Authenticated
  const loadUserData = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const response = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserId(response.data.user._id);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  //load all User's tasks
  const loadUserTasks = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      const response = await api.get(`/all-task-from/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setUserTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  // add new task
  const handleAddNewTask = () => {
    setShowAddPopUp(true);
  };

  const handleCloseAddPopUp = () => {
    setShowAddPopUp(false);
  };

  const handleSubmitNewTask = async (formData: {
    title: string;
    description: string;
    visibility: string;
    status: string;
  }) => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const response = await api.post("/new-task", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserTasks((prevUserTasks) => [...prevUserTasks, response.data.task]);
      setShowAddPopUp(false);
    } catch (error) {
      console.error(error);
    }
  };

  // delete task
  const handleDeleteBtn = (id: string) => {
    setShowDeletePopUp(true);
    setTaskId(id);
  };

  const handleCancelBtn = () => {
    setShowDeletePopUp(false);
    setTaskId(null);
  };

  const handleComfirmDeletBtn = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }
      await api.delete(`/single-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allTasks = userTasks.filter((task) => task._id !== taskId);
      setUserTasks(allTasks);
      setShowDeletePopUp(false);
    } catch (error) {
      console.error(error);
    }
  };

  // editing task
  const handleEditBtn = (value: TasksProps) => {
    setShowEditingPopUp(true);
    setTaskId(value._id);
    setDefaultTitle(value.title);
    setDefaultDescription(value.description);
  };

  const handleCloseEditingPopUp = () => {
    setShowEditingPopUp(false);
  };

  const handleFormSubmition = async (formData: {
    title: string;
    description: string;
    visibility: string;
    status: string;
  }) => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }
      const response = await api.patch(`/single-task/${taskId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUserTasks = userTasks.map((task) =>
        task._id === taskId ? response.data.task : task
      );

      setUserTasks(updatedUserTasks);
      setShowEditingPopUp(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* PopUps */}
      {showAddPopUp && (
        <EditingAddTasks
          method="POST"
          popUpTitle="Creat new task"
          onSubmit={handleSubmitNewTask}
          closePopUp={handleCloseAddPopUp}
        />
      )}

      {showDeletePopUp && (
        <DeletePopUp
          cancelBtn={handleCancelBtn}
          deleteBtn={handleComfirmDeletBtn}
        />
      )}

      {showEditingPopUp && (
        <EditingAddTasks
          method="PACTH"
          popUpTitle="Editing task"
          onSubmit={handleFormSubmition}
          closePopUp={handleCloseEditingPopUp}
          defaultTitle={defaultTitle}
          defaultDescription={defaultDescription}
        />
      )}
      {/* End of PopUps */}

      <main className="user-tasks">
        <nav className="user-nav-top">
          <div className="userPhoto">
            <img src={DefaultGIFs[14].image} alt="user photo" />
          </div>
          <h1>Tasks</h1>
          <button className="new-task" onClick={handleAddNewTask}>
            + New Task
          </button>
        </nav>
        <nav className="user-nav-bottom">
          <ul>
            <li>Title</li>
            <li>Description</li>
            <li>Status</li>
            <li>Visibility</li>
          </ul>
        </nav>
        <section>
          {isLoading ? (
            <div className="loading">
              <img src={LoadingSvg} alt="loading svg" />
            </div>
          ) : userTasks.length > 0 ? (
            <>
              {userTasks.map((value) => (
                <Task
                  key={value._id}
                  hasButtons={true}
                  hasVisibility={true}
                  complete={value.status === "completed" ? true : false}
                  title={value.title}
                  description={value.description}
                  status={value.status}
                  visibility={value.visibility}
                  editBtn={() => handleEditBtn(value)}
                  deleteBtn={() => handleDeleteBtn(value._id)}
                />
              ))}
            </>
          ) : (
            <div className="user-no-tasks-div">
              <p className="user-no-tasks">You don't have tasks yet</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default UserTasks;
