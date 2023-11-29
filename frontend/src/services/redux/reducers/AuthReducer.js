import { AuthTypes } from "../types/AuthTypes";

const intialState = {
    Auth: []
};
const AuthReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case AuthTypes.CONNECTION:
            return { ...state, Auth: payload };

        case AuthTypes.INSCRIPTION:
            return { ...state, newAuth: payload };
        default:
            return state;
    }
};

export { AuthReducer };
