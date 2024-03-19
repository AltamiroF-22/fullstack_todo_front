import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import "./Register.sass";

const Register: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [hasError, sethasError] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    // Remove mensagens de erro antigas
    for (const errorMsg of formRef.current.querySelectorAll(".erro-text")) {
      errorMsg.remove();
    }

    const checkFields = () => {
      let keep = true;
      if (name.trim().length < 10) {
        createError(nameRef, "Name must have at least 10 characters!");
        keep = false;
      }
      if (email.trim().length < 1) {
        createError(emailRef, "Email is required!");
        keep = false;
      }
      if (password.trim().length < 10) {
        createError(passwordRef, "Password must have at least 10 characters!");
        keep = false;
      }
      console.log(keep);

      if (keep) {
        sethasError(false);
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
    div.classList.add("erro-text");
    input.current?.insertAdjacentElement("afterend", div);
  };

  return (
    <main className="container">
      <h1>TO DO LIST</h1>
      <section className="form-father">
        <h1>Register</h1>
        <form className="Form-son" onSubmit={handleFormSubmit} ref={formRef}>
          <div>
            <label htmlFor="name">Username:</label>
            <input type="text" name="name" id="name" ref={nameRef} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" ref={emailRef} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <Link to="/login">Already have an account?</Link>
      </section>
    </main>
  );
};

export default Register;
