/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import PropTypes from "prop-types";
import InputDf from "./ui/InputDf";
import InputFile from "./ui/InputFile";
import TextareaDf from "./ui/TextareaDf";
import Button from "./ui/Button";
import GoogleAuthComponent from "./GoogleAuthComponent";
function FormLogin({ type, handelChange, handleSubmit, formData}) {
  let formChamp = [];

  switch (type) {
    case "signin":
      formChamp = [
        { label: "Email", name: "email", value: formData.email },
        { label: "Password", name: "password", value: formData.password },
        { label: "First Name", name: "firstName", value: formData.firstName },
        { label: "Last Name", name: "lastName", value: formData.lastName },
        { label: "Repeat Password", name: "repeatPass", value: formData.repeatPass },
      ];
      break;
    case "login":
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
      <div className="border-[1px] rounded-lg px-5 py-4 shadow-xl">
        <h1 className="text-center text-base font-semibold">
          {type === "sighin" ? "Sign Up" : "Sign In"}
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
            name={type === "sighin" ? "Sign Up" : "Sign In"}
            onSubmit={() => handleSubmit()}
			style="bg-gradient-to-l from-blue-500 to-blue-600 w-full text-white rounded-md py-[4px] "
			/>

			<GoogleAuthComponent  />
        </div>
      </div>
    </div>
  );
}

FormLogin.propTypes = {
  type: PropTypes.string.isRequired,
  handelChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object,
};

export default FormLogin;
