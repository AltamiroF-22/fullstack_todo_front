import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { createError } from "../../utils/createError";
import { clearErrors } from "../../utils/clearErros";
import Warning from "../../components/warning/Warning";
import "./Register.sass";

const Register: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [hasError, setHasError] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = formRef.current;
    if (!form) return;
    const name = nameRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    setHasError(false);
    clearErrors(form);
    checkFields(name, email, password);

    if (hasError) return;
    postNewUser(name, email, password);
  };

  const checkFields = (name: string, email: string, password: string): void => {
    if (name.trim().length < 4) {
      createError(nameRef, "Name must have at least 4 characters!");
      setHasError(true);
    }
    if (name.trim().length > 15) {
      createError(nameRef, "Name can't have more than 15 characters!");
      setHasError(true);
    }
    if (email.trim().length < 1) {
      createError(emailRef, "Email is required!");
      setHasError(true);
    }
    if (password.trim().length < 8) {
      createError(passwordRef, "Password must have at least 8 characters!");
      setHasError(true);
    }
  };

  const postNewUser = async (name: string, email: string, password: string) => {
    try {
      await api.post("/create-user", {
        name,
        email,
        password,
      });

      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.message;
        createError(emailRef, errorMessage);
      }
    }
  };

  return (
    <main className="container">
      <h1 className="title">TODOLIST</h1>
      <section className="form-father">
        <h1>Register</h1>
        <form className="Form-son" onSubmit={handleFormSubmit} ref={formRef}>
          <div className="input-label">
            <label htmlFor="name">Username:</label>
            <input
              autoComplete="off"
              type="text"
              name="name"
              id="name"
              ref={nameRef}
            />
          </div>
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
          <button type="submit">Register</button>
        </form>
        <p>
          <Link className="p" to="/login">
            Already have an account?
          </Link>
        </p>
      </section>

      <Warning />
    </main>
  );
};

export default Register;
