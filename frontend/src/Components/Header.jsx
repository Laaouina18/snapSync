import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "./ui/Button";
import { Logout } from "../services/redux/actions/AuthActions";

function Header() {
  const user = JSON.parse(localStorage.getItem("User"));
  const dispatch = useDispatch();
  const history = useHistory();

  function redirect() {
    if (user) {
      dispatch(Logout());
    }
	
    history.push("/auth");
  }

  return (
    <>
      <div className="flex justify-around  bg-white border py-1 shadow-md">
        <p className="text-4xl font-medium text-sky-500 text-center">
          SnapSync
        </p>
		<div className="flex justify-around">
		<p className="px-5 pt-2">{user ? user.firstName + "  " + user.lastName : ""}</p>
        <Button
          name={user ? "LOGOUT" : "SIGN IN"}
          onSubmit={redirect}
          style={user ? "bg-gradient-to-l from-red-500 to-red-500  px-5 pr-6 text-white rounded-md "
		  :"bg-gradient-to-l from-blue-800 to-blue-800  px-5 pr-6 text-white rounded-md "}/>
		</div>
       
      </div>
    </>
  );
}

export default Header;
