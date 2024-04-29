import "./FriendsTasks.sass";
import { DefaultGIFs } from "../../assets/default_GIFs/data/defaultsGifs";
import LoadingSvg from "../../assets/svg/loader.svg";
import Task from "../../components/task/Task";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { TasksProps } from "./FriendsTasks_Interface";

const FriendsTasks = () => {
  const [friendTasks, setFriendTasks] = useState<TasksProps[]>([]);
  const [friendName, setFriendName] = useState<string>("...");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setFriendName("...");
    loadFriend();
    loadFriendTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadFriend = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      const response = await api.get(`/others-users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFriendName(response.data.user.name);
    } catch (error) {
      console.error(error);
    }
  };

  const loadFriendTasks = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      const response = await api.get(`/all-task-from/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const tasks = response.data.tasks;

      // returns only publics tasks from the owner
      const publicTasks = tasks.filter(
        (task: TasksProps) => task.visibility === "public"
      );

      setFriendTasks(publicTasks);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="user-tasks">
        <nav className="user-nav-top">
          <div className="userPhoto">
            <img
              src={
                DefaultGIFs[Math.floor(Math.random() * DefaultGIFs.length)]
                  .image
              }
              alt="user photo"
            />
          </div>
          <h3>{friendName}'s public tasks</h3>
        </nav>
        <nav className="userFriend-nav-bottom">
          <ul>
            <li>Title</li>
            <li>Description</li>
            <li>Status</li>
          </ul>
        </nav>
        <section>
          {isLoading ? (
            <div className="loading">
              <img src={LoadingSvg} alt="loading svg" />
            </div>
          ) : friendTasks.length > 0 ? (
            <>
              {friendTasks.map((value) => (
                <Task
                  key={value._id}
                  hasButtons={false}
                  hasVisibility={false}
                  complete={value.status === "completed" ? true : false}
                  title={value.title}
                  description={value.description}
                  status={value.status}
                />
              ))}
            </>
          ) : (
            <div className="user-no-tasks-div">
              <p className="user-no-tasks">{friendName} has no tasks yet</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default FriendsTasks;
