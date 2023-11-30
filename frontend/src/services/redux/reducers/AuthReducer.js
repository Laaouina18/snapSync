import { AuthTypes } from "../types/AuthTypes";

const initialState = {
    Auth: null
};

const AuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AuthTypes.CONNECTION:
    
            localStorage.setItem('token', payload.token);
			localStorage.setItem('User',JSON.stringify(payload.user));
		console.log(localStorage.getItem('User'));
            return { ...state, Auth: payload.token };
        case AuthTypes.INSCRIPTION:
            return { ...state, newAuth: payload };
        default:
            return state;
    }
};

export { AuthReducer };
