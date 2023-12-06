import { AiFillLike } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import {getPost} from   "../services/redux/actions/PostActions";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";

function PostDetail() {
	const location = useLocation();
	const post = useSelector((state) => state.PostsReducer.post);
	const dispatch = useDispatch();
	useEffect(() => {
		console.log(location.state.id,location.state.tags);
        dispatch(getPost(location.state.id,location.state.tags));
    }, [dispatch]);
    return (
		
		(post? 
        <div className="w-full">
                    
            <div className="flex flex-row">
				
			
			<div className="flex flex-col">
				<span className=" text-sm text-gray-500  ">{post.post.tags}</span>
				<span className=" text-xl font-medium text-gray-800">
					{post.post.title}
				</span>
				<span className=" text-sm text-gray-500">{post.post.message}</span>
				<div className=" w-11/12 flex justify-between pb-5 ">
				
						<AiFillLike className="text-xl  " />
						<span className=" text-sm select-none ">
							LIKE {post.post.likeNumber}
						</span>
						<div className="flex justify-between items-center w-10/12 text-white">
						<span className="text">{post.post.name}</span>
				
					
				</div>
				</div> 
		
	


	  </div>
	  <img className=" h-full  " src={post.post.image} alt="test" />
            
            
			</div>

			<p className="text-xl">les publications recommandés:</p>
			{post.recomanded.map((post, index) => {
				return( <div className="flex flex-row"  key={index} >
		
				<div className=" h-40 border-b-[1px] mb-4 overflow-hidden relative ">
                <img className=" h-full  " src={post.image} alt="test" />
                <div className="absolute left-0 top-0 bg-black  h-full bg-opacity-50 "></div>
                <div className="absolute left-0 top-3 ">
                    <div className="flex justify-center">
                        <div className="flex justify-between items-center w-10/12 text-white">
                            <span className="text">{post.name}</span>
					
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-start flex-col gap-y-4 pl-5">
                    <span className=" text-sm text-gray-500  ">{post.tags}</span>
                    <span className=" text-xl font-medium text-gray-800">
                        {post.title}
                    </span>
                    <span className=" text-sm text-gray-500">{post.message}</span>
                    <div className=" w-11/12 flex justify-between pb-5 ">
                    
                            <AiFillLike className="text-xl  " />
                            <span className=" text-sm select-none ">
                                LIKE {post.likeNumber}
                            </span>
                    </div> 
                </div>
            </div>
				</div>
				
			);})}
        
        </div>

		
		: "")
    );
}



export default PostDetail;
