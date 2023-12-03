import { Router } from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {
    getAllPosts,
    CreatePost,
    UpadetPost,
    DeletePost,
    LikePost,
	getPost
} from "../controllers/PostController.js";

const router = Router();

/**
 * @GET
 * @desc // get all Posts
 * @access public
 */
router.get("/", getAllPosts);
/**
 * @GET
 * @desc // get  Post
 * @access public
 */
router.get("/search",getPost );

/**
 * @POST
 * @desc // create a new Post
 * @access POST
 */
router.post("/", authMiddleware, CreatePost);

/**
 * @PATCH
 * @desc // update a Post
 * @access PATCH
 */
router.patch("/:id", authMiddleware, UpadetPost);
/**
 * @DELETE
 * @desc //DELETE a Post
 * @access DELETE
 */
router.delete("/:id", authMiddleware, DeletePost);

/**
 * @PATCH
 * @desc //LIKE a Post
 * @access PATCH
 */
router.patch("/likes/:id", authMiddleware, LikePost);
export default router;
