import InputDf from "./ui/InputDf";
import InputFile from "./ui/InputFile";
import TextareaDf from "./ui/TextareaDf";
import Button from "./ui/Button";
import PropTypes from "prop-types";

function Form({ type, handelChange, handleSubmit, formData, ClearForm }) {
	const user=localStorage.getItem('User');
    return (
        <div className="bg-white w-10/12 ">
		{user  &&
            <div className="border-[1px] rounded-lg px-5 py-4 shadow-xl">
                <h1 className="text-center  text-base font-semibold">
                    {type === "create" ? "Creating a Memory" : "update "}
                </h1>
                <div className="flex flex-col gap-4 justify-center py-2">
                    <InputDf
                        label="title"
                        name="title"
                        onChange={handelChange}
                        value={formData.title}
                    />
                    <TextareaDf
                        label="message"
                        name="message"
                        onChange={handelChange}
                        value={formData.message}
                    />
                    <InputDf
                        label="tags"
                        name="tags"
                        onChange={handelChange}
                        value={formData.tags}
                    />
                    <InputFile
                        placeholder="choose a file"
                        name="image"
                        onChange={handelChange}
                    />
                    <Button
                        name="SUBMIT"
                        onSubmit={() => handleSubmit()}
						style="bg-gradient-to-l from-blue-500 to-blue-600 w-full text-white rounded-md py-[4px] "
                    />
                    <Button
                        name="CLEAR"
                        bgColor="  bg-gradient-to-l from-red-500 to-red-600 "
                        onSubmit={ClearForm}
						style="bg-gradient-to-l from-red-500 to-red-600 w-full text-white rounded-md py-[4px] "
                    />
                </div>
            </div>
		}
		{!user &&
                <div className="border-[1px] rounded-lg px-5 py-4 shadow-xl">
                    Please Signin in to create your Own posts and like other's posts
                </div>
            }
        </div>
    );
}

Form.propTypes = {
    type: PropTypes.string.isRequired,
    handelChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    ClearForm: PropTypes.func.isRequired,
    formData: PropTypes.object
};

export default Form;
