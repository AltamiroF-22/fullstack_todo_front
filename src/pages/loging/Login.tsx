import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { createError } from "../../utils/createError";
import { clearErrors } from "../../utils/clearErros";
import { ErrorResponse, LoginResponse } from "./login_interfaces";
import "../register/Register.sass";
import Warning from "../../components/warning/Warning";

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [hasError, setHasError] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = formRef.current;
    if (!form) return;
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    setHasError(false);
    clearErrors(form);
    checkFields(email, password);

    if (!hasError) {
      login(email, password);
    }
  };

  const checkFields = (email: string, password: string): void => {
    if (email.trim().length < 1) {
      createError(emailRef, "Email is required!");
      setHasError(true);
    }
    if (password.trim().length < 8) {
      createError(passwordRef, "Password must have at least 8 characters!");
      setHasError(true);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<LoginResponse>("/login", {
        email,
        password,
      });

      localStorage.setItem("jwtToken", response.data.token);
      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = (error.response.data as ErrorResponse).message;
      const fieldRef = error.response.data.field;
      createError(
        fieldRef === "password" ? passwordRef : emailRef,
        errorMessage
      );
    }
  };

  return (
    <main className="container">
      <h1 className="title">TODOLIST</h1>
      <section className="form-father">
        <h1>Login</h1>
        <form className="Form-son" onSubmit={handleFormSubmit} ref={formRef}>
          <div className="input-label">
            <label htmlFor="email">Email:</label>
            <input
              autoComplete="off"
              type="email"
              name="email"
              id="email"
              ref={emailRef}
            />
          </div>
          <div className="input-label">
            <label htmlFor="password">Password:</label>
            <input
              autoComplete="off"
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          <Link className="p" to="/register">
            does not have an account?
          </Link>
        </p>
      </section>

      <Warning />
    </main>
  );
};

export default Login;
