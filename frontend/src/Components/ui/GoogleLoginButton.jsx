
import React from 'react';
import { FaGoogle } from "react-icons/fa";

const GoogleLoginButton = (type) => {
  return (
    <div className="flex items-center justify-center ">
      <button className="bg-blue-500 text-white p-3 rounded-md flex items-center space-x-2" >
        <span>
        <FaGoogle  />
        </span>
        <span>{type==="signin"?"Se connecter avec Google":"Continuer avec Google"}</span>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
