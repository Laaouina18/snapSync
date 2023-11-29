import { combineReducers } from "redux";
import { PostsReducer } from "./PostReducer";
import { AuthReducer } from "./AuthReducer";
const reducers = combineReducers({
    PostsReducer,
	AuthReducer
});

export default reducers;
