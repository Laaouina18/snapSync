import mongoose from "mongoose";

const UserShema = mongoose.Schema({
		firstName: {
		type: String,
		required: [true, "please enter your First Name"]
	},
	lastName: {
		type: String,
		required: [true, "please enter your Last Name"]
	},
	email: {
		type: String,
		required: [true, "please enter your email"]
	},
	password: {
		type: String,
		required: [true, "please enter your password"]
	}
}
)

const User = mongoose.model("user", UserShema);
export default User;
