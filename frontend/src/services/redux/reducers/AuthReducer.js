import { AuthTypes } from "../types/AuthTypes";

const initialState = {
    Auth: null
};

const AuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AuthTypes.CONNECTION:
           console.log(payload);
            localStorage.setItem('token', payload.token);
			localStorage.setItem('User',JSON.stringify(payload.user));
		console.log(localStorage.getItem('User'));
            return { ...state, Auth: payload.token };
        case AuthTypes.INSCRIPTION:
            return { ...state, newAuth: payload };
		case AuthTypes.LOGOUT:
			localStorage.removeItem('User');
            localStorage.removeItem('token');
			return state
        default:
            return state;
    }
};

export { AuthReducer };
