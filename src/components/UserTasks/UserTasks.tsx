import "./UserTasks.sass";
import Task from "../task/Task";
import DeletePopUp from "../delete- pop-up/DeletePopUp";
import EditingAddTasks from "../editing_add-tasks/Editing_add-tasks";
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
  const [showDeletePopUp, setShowDeletePopUp] = useState<boolean>(false);
  const [showEditiongPopUp, setShowEditiongPopUp] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string | null>(null);

  useEffect(() => {
    loadUserTasks();
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, userTasks]);
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
      setUserTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
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
      const response = await api.delete(`/single-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allTasks = userTasks.filter((task) => task._id !== taskId);
      setUserTasks(allTasks);
      setShowDeletePopUp(false);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  /// editing task
  const handleEditBtn = (id: string) => {
    setShowEditiongPopUp(true);
    setTaskId(id);
  };

  const handleCloseEditingPopUp = () => {
    setShowEditiongPopUp(false);
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

      console.log(response);
      setShowEditiongPopUp(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* PopUps */}

      {showDeletePopUp && (
        <DeletePopUp
          cancelBtn={handleCancelBtn}
          deleteBtn={handleComfirmDeletBtn}
        />
      )}

      {showEditiongPopUp && (
        <EditingAddTasks
          method="PACTH"
          popUpTitle="Editing task"
          onSubmit={handleFormSubmition}
          closePopUp={handleCloseEditingPopUp}
        />
      )}

      {/* End of PopUps */}
      <main className="user-tasks">
        <nav className="user-nav-top">
          <div className="userPhoto">
            <img src={DefaultGIFs[14].image} alt="user photo" />
          </div>
          <h1>Tasks</h1>
          <button className="new-task">+ New Task</button>
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
          {userTasks.length > 0 ? (
            userTasks.map((value) => (
              <Task
                key={value._id}
                hasButtons={true}
                hasVisibility={true}
                complete={value.status === "completed" ? true : false}
                title={value.title}
                description={value.description}
                status={value.status}
                visibility={value.visibility}
                editBtn={() => handleEditBtn(value._id)}
                deleteBtn={() => handleDeleteBtn(value._id)}
              />
            ))
          ) : (
            <p className="user-no-tasks"> You don't have tasks yet</p>
          )}
        </section>
      </main>
    </>
  );
};

export default UserTasks;
