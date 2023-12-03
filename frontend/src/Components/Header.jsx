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
      <div className="flex rounded-2xl bg-white border py-1 shadow-md">
        <p className="text-4xl font-medium text-sky-500 text-center">
          SnapSync
        </p>
        <p>{user ? user.firstName + "  " + user.lastName : ""}</p>
        <Button
          name={user ? "Logout" : "sgnin"}
          bgColor="bg-gradient-to-l from-red-500 to-red-600"
          onSubmit={redirect}
          style="bg-gradient-to-l from-red-500 to-red-600 text-white rounded-md py-[4px]"
        />
      </div>
    </>
  );
}

export default Header;
