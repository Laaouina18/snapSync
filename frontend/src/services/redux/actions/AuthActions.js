import axios from "../../api/Axios";
import { AuthTypes } from "../types/AuthTypes";


const Connection=(User)=>{
	console.log(User)
	return async (dispatch) => {
		if(User.Istrue){
			const data = {
				"user": {
			"_id":User._id,
	        "firstName": User.firstName,
				  "lastName": User.lastName,
				 "email": User.email,
				},
				"token": User.token
		      };

	
			dispatch({ type: AuthTypes.CONNECTION, payload:data});
			
		}
        const response = await axios.post("/auth/login",User);
        dispatch({ type: AuthTypes.CONNECTION, payload: response.data });
    };
}
const Inscription=(User)=>{
	
	return async (dispatch) => {
        const response = await axios.post("/auth/inscription",User);
		console.log(response);
        dispatch({ type: AuthTypes.INSCRIPTION, payload: response.data });
    };
}
const Logout=()=>{
	
 return async (dispatch)=>{

	dispatch({ type: AuthTypes.LOGOUT, payload: "logout"});
 }
}
export { Connection,Inscription,Logout };

