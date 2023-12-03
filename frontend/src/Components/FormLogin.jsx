/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import PropTypes from "prop-types";
import InputDf from "./ui/InputDf";
import InputFile from "./ui/InputFile";
import TextareaDf from "./ui/TextareaDf";
import Button from "./ui/Button";
import { GoogleLogin } from "@react-oauth/google";

function FormLogin({ type,changerSign, handelChange, handleSubmit, formData,responseMessage,errorMessage}) {
  let formChamp = [];

  switch (type) {
    case true:
      formChamp = [
        { label: "Email", name: "email", value: formData.email },
        
        { label: "First Name", name: "firstName", value: formData.firstName },
        { label: "Last Name", name: "lastName", value: formData.lastName },
		{ label: "Password", name: "password", value: formData.password },
        { label: "Repeat Password", name: "repeatPass", value: formData.repeatPass },
      ];
      break;
    case false:
      formChamp = [
        { label: "Email", name: "email", value: formData.email },
        { label: "Password", name: "password", value: formData.password },
      ];
      break;
    default:
		 return null;
  }


  return (
    <div className="bg-white w-full">
      <div className="border-[1px] rounded-md px-5 py-4 shadow-xl">
        <h1 className="text-center text-base font-semibold">
          {type? "SIGN UP" : "SIGN IN"}
        </h1>
        <div className="flex flex-col gap-4 justify-center py-2">
          {formChamp.map((field, index) => (
            <div key={index}>
              <InputDf
                label={field.label}
                name={field.name}
                onChange={handelChange}
                value={field.value}
              />
            </div>
          ))}

          <Button
            name={type ? "SIGN UP" : "SIGN IN"}
            onSubmit={() => handleSubmit()}
			style="bg-gradient-to-l from-blue-800 to-blue-800 w-full text-white rounded-md py-[4px] "
			/>
			   <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
			   <Button
            name={type ?  "ALREADY HAVE AN ACCOUNT? SIGN IN":"D'ONT HAVE AN ACCOUNT? SIGN UP"}
            onSubmit={changerSign}
			style="w-full text-black rounded-md py-[4px] "
			/>
        </div>
      </div>
    </div>
  );
}

FormLogin.propTypes = {
  type: PropTypes.bool.isRequired,
  handelChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object,
  ErrorMessage:PropTypes.func,
  responseMessage:PropTypes.func,
  changerSign:PropTypes.func.isRequired
  
};

export default FormLogin;
