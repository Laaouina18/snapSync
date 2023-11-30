import React, { useState ,useEffect } from "react";
import Header from "../Components/Header";
import FormLogin from "../Components/FormLogin";
import { useDispatch ,useSelector} from "react-redux";
import { Connection, Inscription } from "../services/redux/actions/AuthActions";
import { FcGoogle } from "react-icons/fc"; 

function Auth() {
	const User = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
 

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
	console.log(User);
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
            handelChange={handelChange}
            handleSubmit={type === "login" ? handleLogin : handleSignup}
          />
     
        </div>
      </div>
    </div>
  );
}

export default Auth;
