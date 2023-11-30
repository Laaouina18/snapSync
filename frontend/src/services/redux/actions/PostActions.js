import axios from "../../api/Axios";
import { actionTypes } from "../types/action-Types";

const fetchPosts = () => {
    return async (dispatch) => {
        const response = await axios.get("/post");
        dispatch({ type: actionTypes.FETCH_POSTS, payload: response.data });
    };
};

const CreatePost = (post,user,token) => {
	console.log(token);
    return async (dispatch) => {
		const { title, image, date, message, tags } = post;
		const creator=user;
        const response = await axios.post("/post/", {
            title,
            image,
            date,
            creator,
            message,
            tags
        },{
			headers: {
				'Authorization': `Bearer ${token}`}
			});
        dispatch({ type: actionTypes.CREATE_POST, payload: response.data });

        dispatch(fetchPosts());
    };
};
const UpdatePost = (post, user,id, token) => {
    return async (dispatch) => {
		const creator=user;
        const { title, image, date, message, tags } = post;
        const response = await axios.patch(`/post/${id}`, {
            title,
            image,
            date,
            creator,
            message,
            tags
        },{
			headers: {
				'Authorization': `Bearer ${token}`
			}
	});
        dispatch({ type: actionTypes.UPDATE_POST, payload: response.data });

        dispatch(fetchPosts());
    };
};

const LikePost=(id,userId,token)=>{
 return async(dispatch)=>{
     const response = await axios.patch(`/post/likes/${id}`,{ userId: JSON.stringify(userId) },{
		headers: {
			'Authorization': `Bearer ${token}`
		}
	 });
	 dispatch({type:actionTypes.LIKE_POST,payload:response.data});
	  dispatch(fetchPosts());
 };
};
const DeletePost = (id, token) => {
    return async (dispatch) => {
        const response = await axios.delete(`/post/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch({ type: actionTypes.DELETE_POST, payload: response.data });
        dispatch(fetchPosts());
    };
};


export { fetchPosts, CreatePost, UpdatePost, LikePost, DeletePost };

