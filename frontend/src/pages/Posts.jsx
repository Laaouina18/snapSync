import Header from "../Components/Header";
import Post from "../Components/Post";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Moment from 'moment';
import FormSearch from "../Components/FormSearch";
import Pagination from '@mui/material/Pagination';
import { useHistory } from "react-router-dom";
import {
    fetchPosts,
    CreatePost,
    UpdatePost,
    LikePost,
    DeletePost,
	searchPost
} from "../services/redux/actions/PostActions";

import Form from "../Components/Form";
import { convertImageToBase64, emptyFileInpute } from "../utils/HelpesFunc";

function Posts() {
	const history= useHistory();
    const posts = useSelector((state) => state.PostsReducer.posts);
	const token=localStorage.getItem('token');
	const user=JSON.parse(localStorage.getItem('User'));
    const dispatch = useDispatch();
	const [NumPage, setNumPage] = useState(1);
	console.log(posts);
	const Num=2;
    useEffect(() => {
        dispatch(fetchPosts(NumPage));
    }, [dispatch], [NumPage]);
    const [FormRecherche,setFormRecherche]=useState({
		title:"",
		tags:""
	})
    const [form, setForm] = useState({
        title: "",
        image: "",
        message: "",
        tags: ""
    });

    async function handelChange(e) {
        const { name, value, files } = e.target;

        const inputeValue =
            name === "image"
                ? (await convertImageToBase64(files[0])) || ""
                : value;
        setForm((prev) => ({
            ...prev,
            [name]: inputeValue
        }));
    }
 function handelChangeSearch(e){
	const { name, value  } = e.target;
	setFormRecherche((prev) => ({
		...prev,
		[name]: value
	}));
 }
    const [SelectedPostId, SetselectedPostId] = useState(null);
    const [FormType, SetFormType] = useState("create");

    function handelFormType({ title, message, tags, image, id }) {
        SetselectedPostId(id);
        SetFormType("update");
        setForm({
            title: title,
            message: message,
            tags: tags.join(""),
            image: image
        });
    }

    function handleSubmit() {
        dispatch(CreatePost(form,user._id,user.firstName,token));
        setForm({
            title: "",
            image: "",
            message: "",
            tags: ""
        });

        emptyFileInpute("imageInput");
    }
function handleSubmitSearch(){
dispatch(searchPost(FormRecherche));
setFormRecherche({
	title: "",
	tags: "" 
});
}
    function Update() {
        dispatch(UpdatePost(form,user, SelectedPostId,token));
        setForm({

            title: "",
            image: "",
            message: "",
            tags: ""
        });
        emptyFileInpute("imageInput");
        SetFormType("create");
    }

    function ClearForm() {
        setForm({
            title: "",
            image: "",
            message: "",
            tags: ""
        });

      emptyFileInpute("imageInput");
        SetFormType("create");
    }

    function likePost(postId) {
		const user=JSON.parse(localStorage.getItem('User'));
        dispatch(LikePost(postId,user._id,token));
    }

    function handleDelete(postId) {
        dispatch(DeletePost(postId,token));
    }
	function handlePaginationChange(event, value) {
        setNumPage(value);
        dispatch(fetchPosts(value));
    }
	function postdetail(id,tags){
		// console.log("hi");
		// console.log(tags[0]);
		history.push("/PostDetail",{
			id:id,
			tags:tags
		})


	}
    return (
        <div className=" m-4">
            <Header />
            <div className=" grid xl:grid-cols-[60%_40%] lg:grid-cols-[60%_40%]  m-6 ">
                <div className="w-12/12">
                    <div className=" grid  xl:grid-cols-2 lg:grid-cols-2  md:grid-cols-3 sm:grid-cols-2  gap-4 ">
                        {posts.map((post, index) => {
                            return (
                                <Post
                                    key={index}
                                    id={post._id}
                                    title={post.title}
                                    image={post.image}
									date={Moment(post.createdAt).fromNow()} 
                                    creator={post.creator}
									name={post.name}
									post={postdetail}
                                    message={post.message}
                                    likeNumber={post.like.length}
                                    tags={post.tags}
                                    updatefunc={handelFormType}
                                    like={likePost}
                                    handleDelete={handleDelete}

                                />
                            );
                        })}
                    </div>
                </div>

                <div className=" w-full flex flex-col justify-center ml-2 ">
				<FormSearch
                        handelChange={handelChangeSearch}
                        handleSubmit={handleSubmitSearch }
                        formDataSearch={FormRecherche}
                    />
				
                    <Form
                        type={FormType}
                        handelChange={handelChange}
                        handleSubmit={
                            FormType === "create" ? handleSubmit : Update}
                        formData={form}
                        ClearForm={ClearForm}
                    />
					  <div className="bg-white w-10/12 flex justify-center p-2 ">
					   <Pagination count={Num}  page={NumPage} onChange={handlePaginationChange}/>
					  </div>
				
                </div>
            
            </div>
        </div>
    );
}


export default Posts;
