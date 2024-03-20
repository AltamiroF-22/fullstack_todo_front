import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
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

    // Remove mensagens de erro antigas
    for (const errorMsg of form.querySelectorAll(".error-text")) {
      errorMsg.remove();
    }

    const checkFields = () => {
      let keep = true;
      if (name.trim().length < 4) {
        createError(nameRef, "Name must have at least 4 characters!");
        keep = false;
      }
      if (email.trim().length < 1) {
        createError(emailRef, "Email is required!");
        keep = false;
      }
      if (password.trim().length < 8) {
        createError(passwordRef, "Password must have at least 8 characters!");
        keep = false;
      }

      setHasError(!keep);
      if (keep) {
        setHasError(false);
        return;
      }
    };

    checkFields();
    if (hasError) return;

    try {
      const response = await api.post("/create-user", {
        name,
        email,
        password,
      });

      console.log(response);

      navigate("/login");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.message;
        createError(emailRef, errorMessage);
      }
    }
  };

  const createError = (
    input: React.RefObject<HTMLInputElement>,
    message: string
  ): void => {
    const div = document.createElement("div");
    div.innerHTML = message;
    div.style.color = "red";
    div.classList.add("error-text");
    input.current?.insertAdjacentElement("afterend", div);
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
    </main>
  );
};

export default Register;
