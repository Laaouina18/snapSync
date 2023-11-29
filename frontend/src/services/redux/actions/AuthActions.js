import axios from "../../api/Axios";
import { AuthTypes } from "../types/AuthTypes";


const Connection=(User)=>{
	console.log(User);
	return async (dispatch) => {
        const response = await axios.post("/auth/login",User);
        dispatch({ type: AuthTypes.CONNECTION, payload: response.data });
    };
}
const Inscription=(User)=>{
	console.log(User);
	return async (dispatch) => {
        const response = await axios.post("/auth/inscription",User);
        dispatch({ type: AuthTypes.INSCRIPTION, payload: response.data });
    };
}
export { Connection,Inscription };

