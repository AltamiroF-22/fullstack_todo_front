import "./UserTasks.sass";
import Task from "../task/Task";
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

  useEffect(() => {
    loadUserTasks();
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
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

  const handleEditBtn = (id: string) => {
    alert(id);
  };
  const handleDeleteBtn = (id: string) => {
    alert(id);
  };

  return (
    <main className="user-tasks">
      <header className="user-header">
        <nav className="user-nav-top">
          <div className="userPhoto">
            <img src={DefaultGIFs[0].image} alt="user photo" />
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
      </header>
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
  );
};

export default UserTasks;
