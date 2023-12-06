import axios from "../../api/Axios";
import { actionTypes } from "../types/action-Types";

const fetchPosts = (page) => {
    return async (dispatch) => {
        const response = await axios.get(`/post?page=${page}`);
        dispatch({ type: actionTypes.FETCH_POSTS, payload: response.data });
    };
};
const searchPost = (formSearch) => {
    return async (dispatch) => {
        const res = await axios.get(`/post/search?tags=${formSearch.tags}&title=${formSearch.title}`);
		console.log(res);
        dispatch({ type: 'SEARCH_POST', payload: res.data });
    };
};

const getPost=(id,tags)=>{
 return async (dispatch)=>{
	const res= await axios.get(`/post/postdetail/${id}?tags=${tags}`);
	console.log(res.data);
	dispatch({type:'GET_POST',payload:res.data});
 }
}

const CreatePost = (post,userId,userName,token) => {
	console.log(token);
    return async (dispatch) => {
		const { title, image, date, message, tags } = post;
		const creator=userId;
		const name=userName;

        const response = await axios.post("/post/", {
            title,
            image,
            date,
            creator,
			name,
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


export { fetchPosts, CreatePost, UpdatePost, LikePost, DeletePost ,searchPost, getPost};

