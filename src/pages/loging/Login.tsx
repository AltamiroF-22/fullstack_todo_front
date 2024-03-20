import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import "../register/Register.sass";

interface ErrorResponse {
  message: string;
}

interface LoginResponse {
  token: string;
}

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

    for (const errorMsg of form.querySelectorAll(".error-text")) {
      errorMsg.remove();
    }

    const checkFields = () => {
      let keep = true;

      if (email.trim().length < 1) {
        createError(emailRef, "Email is required!");
        keep = false;
      }
      if (password.trim().length < 8) {
        createError(passwordRef, "Password must have at least 8 characters!");
        keep = false;
      }

      setHasError(!keep);

      return keep;
    };

    checkFields();
    if (hasError) return;

    try {
      const response = await api.post<LoginResponse>("/login", {
        email,
        password,
      });

      // Verifique se a resposta contém o token
      if (response.data && response.data.token) {
        const accessToken = response.data.token;

        // Armazene o token de acesso localmente, por exemplo, em localStorage
        localStorage.setItem("jwtToken", accessToken);

        // Navegue para a página inicial ou faça outras ações necessárias
        navigate("/");
      } else {
        console.error(
          "Token de autorização não encontrado na resposta do servidor."
        );
        // Lide com o caso em que o token não está presente na resposta
        // Por exemplo, mostre uma mensagem de erro ao usuário
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error.response && error.response.status === 401) {
        const errorMessage = (error.response.data as ErrorResponse).message;
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
    </main>
  );
};

export default Login;
