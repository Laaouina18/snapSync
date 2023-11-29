import User from "../../models/UserModel.js";
import { userShema, validator } from "../../validator/JoiSchemas.js";
import { CheckRecord } from "../../services/helpers/helpers.js";
import asynchandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/generateToken.js";
/**
 * CREATE new post.
 * @async
 * @route {POST} /auth/inscription
 * @access public
 * @returns {Promise<Document>}
 */
const CreateUser = asynchandler(async (req, res) => {
    const body = req.body;
    validator(userShema, body);
    const user = await User.create(body);
    return res.status(201).json(user);
});
/**
 * CREATE new post.
 * @async
 * @route {GET}/
 * @access public
 * @returns {Promise<Document>}
 */
const GetUser = asynchandler(async (req, res) => {
    const { id } = req.params;
// return res.status(200).json(id);
    const user = await User.findById(id);
    return res.status(200).json(user);
});
const Login = asynchandler(async (req, res) => {
	const { email, password } = req.body;
  
	const user = await User.findOne({ email, password });
  
	if (!user) {
	  return res.status(401).json({ message: "ce compte n'existe pas" });
	}
	const token = generateToken(user);
	return res.status(200).json({ user, token });
  });
export { CreateUser, GetUser, Login };
