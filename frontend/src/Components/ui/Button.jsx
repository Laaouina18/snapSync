import PropTypes from "prop-types";

function Button({ name, onSubmit,style }) {
    return (
        <button
            className={`${style}   `}
            type="submit"
            name={name}
            onClick={onSubmit}
			
        >
            {name}
        </button>
    );
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Button;
