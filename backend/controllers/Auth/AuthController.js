import User from "../../models/UserModel.js";
import { userShema, validator } from "../../validator/JoiSchemas.js";
import { CheckRecord } from "../../services/helpers/helpers.js";
import asynchandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
        return res.status(400).json({ message: "Un compte avec cet email existe déjà" });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await User.create({ ...body, password: hashedPassword });

    return res.status(201).json(user);
});

/**
 * CREATE new post.
 * @async
 * @route {GET}/
 * @access public
 * @returns {Promise<Document>}
 */
const Login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "Ce compte n'existe pas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    const userEx = {
        _id: user._id,
        email: user.email,
		firstName:user.firstName,
		lastName:user.lastName
    };

    const token = generateToken(user);
    return res.status(200).json({ user: userEx, token });
};


export { CreateUser, Login };
