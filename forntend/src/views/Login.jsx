import React, { useState, createRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/client.js";
import { useStateContext } from "../context/Context.jsx";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();

  const { setUser, setToken } = useStateContext();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrorMessage(null)

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
      
        if (response && response.status === 422) {

          if(response.data.errors){
           setErrorMessage(response.data.errors);
          }else{
            setErrorMessage({
              email: [response.data.message]
            })
          }
        
        } else {
          setErrorMessage("An unexpected error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Accedi al tuo account</h1>


          {errorMessage &&
            <div className="alert">
              <p>{errorMessage}</p>
            </div>
          }

          <input autoComplete="new-email" ref={emailRef} type="email" placeholder="Email" />
          <input autoComplete="new-password" ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
