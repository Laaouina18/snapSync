import { Input } from "@material-tailwind/react";
import PropTypes from "prop-types";

function InputDf({ label, name, onChange, value }) {
    return (
        <div className="w-full  ">
            <Input
                onChange={onChange}
                label={label}
                name={name}
                value={value}
            />
        </div>
    );
}

InputDf.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default InputDf;
