import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import "./Register.sass";

const Register: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    const response = await api.post("/create-user", { name, email, password });
    console.log(response);
  };

  return (
    <main className="container">
      <h1>TO DO LIST</h1>
      <section className="form-father">
        <h1>Register</h1>
        <form className="Form-son" onSubmit={handleFormSubmit}>
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
