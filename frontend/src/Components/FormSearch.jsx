import InputDf from "./ui/InputDf";
import Button from "./ui/Button";
import PropTypes from "prop-types";
function FormSearch({  handelChange, handleSubmit, formDataSearch }) {
    return (
        <div className="bg-white w-10/12 mb-2  ">
            <div className="border-[1px] rounded-lg px-5 py-4 shadow-xl">
                <div className="flex flex-col gap-4 justify-center py-2">
                    <InputDf
                        label="Search Memories"
                        name="title"
                        onChange={handelChange}
                        value={formDataSearch.title}
                    />
                    <InputDf
                        label="Search Tags"
                        name="tags"
                        onChange={handelChange}
                        value={formDataSearch.tags}
                    />
                    <Button
                        name="SEARCH"
                        onSubmit={() => handleSubmit()}
						style="bg-gradient-to-l from-blue-500 to-blue-600 w-full text-white rounded-md py-[4px] "
                    />
                </div>
            </div>
        </div>
    );
}

FormSearch.propTypes = {
    handelChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formDataSearch: PropTypes.object
};

export default FormSearch;
