import React, { useState } from "react";
import Header from "../Components/Header";
import FormLogin from "../Components/FormLogin";
import { useDispatch } from "react-redux";
import { Connection, Inscription } from "../services/redux/actions/AuthActions";
import { FcGoogle } from "react-icons/fc"; 
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
function Auth() {

  const dispatch = useDispatch();
  useGoogleOneTapLogin({
	onSuccess: credentialResponse => {
	  console.log(credentialResponse);
	},
	onError: () => {
	  console.log('Login Failed');
	},
  });
  	<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatPass: "",
  });

  const [type, setType] = useState("login");

  function handleChange(e) {
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
  }

  return (
    <div className="m-4">
      <Header />
      <div className="w-full flex justify-center mt-2.5">
        <div className="w-2/5">
          <FormLogin
            type={type}
            formData={form}
            handleChange={handleChange}
            handleSubmit={type === "login" ? handleLogin : handleSignup}
          />
     <GoogleLogin
     onSuccess={credentialResponse => {
       console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
        </div>
      </div>
    </div>
  );
}

export default Auth;
