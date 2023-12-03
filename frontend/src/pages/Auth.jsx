
import React, { useState } from "react";
import Header from "../Components/Header";
import FormLogin from "../Components/FormLogin";
import { useDispatch } from "react-redux";
import { Connection, Inscription } from "../services/redux/actions/AuthActions";
import { GoogleLogin } from "@react-oauth/google";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 
function Auth() {
  const dispatch = useDispatch();
  const history= useHistory();
  const [user, setUser] = useState({
	_id:"",
    firstName: "",
    email: "",
    Istrue: true,
    token: "",
  });

  const responseMessage = (response) => {
    const decodedToken = jwtDecode(response.credential);
    console.log(response);

    const updatedUser = {
      _id: decodedToken.sub,
      firstName: decodedToken.family_name,
      lastName: decodedToken.given_name,
      email: decodedToken.email,
      Istrue: true,
      token: response.credential,
    };

    setUser(updatedUser);
    dispatch(Connection(updatedUser));
    history.push('/');
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatPass: "",
  });

  const [type, setType] = useState("login");

  function handelChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSignup() {
    const { repeatPass, ...newForm } = form;
    dispatch(Inscription(newForm));

    setForm({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      repeatPass: "",
    });
  }

  function handleLogin() {
    const { repeatPass, firstName, lastName, ...newForm } = form;
    dispatch(Connection(newForm));
    setForm({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      repeatPass: "",
    });
    history.push('/');
  }

  return (
    <div className="m-4">
      <Header type={type} />
      <div className="w-full flex justify-center mt-2.5">
        <div className="w-2/5">
          <FormLogin
            type={type}
            formData={form}
            handelChange={handelChange}
            handleSubmit={type === "login" ? handleLogin : handleSignup}
          />
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
      </div>
    </div>
  );
}

export default Auth;
