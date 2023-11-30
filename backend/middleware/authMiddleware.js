import { LogError } from 'concurrently';
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const BearerToken = req.headers.authorization;
    if (BearerToken) {
    const token = BearerToken.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).json({ message: 'token invalide' });
			}
			req.user = decoded;
			next();
		});
	} else {
	    throw new Error("no token");
	}
};

export { authMiddleware };
