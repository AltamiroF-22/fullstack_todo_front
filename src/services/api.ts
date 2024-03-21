import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "https://fullstack-todo-1.onrender.com",

});