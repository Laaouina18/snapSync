import asynchandler from "express-async-handler";
import { create, update } from "../services/post.js";
import { validator, PostSchema } from "../validator/JoiSchemas.js";
import { CheckRecord } from "../services/helpers/helpers.js";
import Post from "../models/PostModel.js";

/**
 * @async
 * @route {GET} /post
 * @access public
 * @returns {Promise<Array<Document>>} A Promise that resolves to an array of documents representing all posts.
 */
const getAllPosts = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const pageSize = 10; 
	const skip = (page - 1) * pageSize;
  
	try {
	  const posts = await Post.find()
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(pageSize);
  
	  res.json(posts);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  };

/**
 * @async
 * @route {GET} /post
 * @access public 
 * @returns {Promise<Array<Document>>} 
 */
const getPost= async (req, res) => {
	const { tags, title } = req.query;
  
	const query = {};
  
	if (tags) {
	  query.tags = { $in: tags.split(',') };
	}
  
	if (title) {
	  query.title = { $regex: title, $options: 'i' };
	}
  
	try {
	  const posts = await Post.find(query);
	  return res.json(posts);
	} catch (error) {
	  return res.status(500).json({ message: error.message });
	}
  };
/**
 * CREATE new post.
 * @async
 * @route {POST} /post
 * @access public
 * @returns {Promise<Document>} A Promise that resolves to an array of documents representing all posts.
 */
const CreatePost = async (req, res) => {
    const body = req.body;
    validator(PostSchema, body);
	
    const post = await create(body);
    res.status(201).json(post);
};

/**
 * Update new post.
 * @async
 * @route {PATCH} /post/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves  documents representing post.
 */
const UpadetPost = async (req, res) => {
    validator(PostSchema, req.body);
    const { tags } = req.body;
    const tagsArray = tags.split(",");

    const body = { ...req.body, tags: tagsArray };
    const { id } = req.params;

    await CheckRecord(Post, id);
    const post = await update(id, body);
    res.status(200).json(post);
};

/**
 * Update new post.
 * @async
 * @route {DELETE} /post/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves to an array of documents representing all post.
 */

const DeletePost = async (req, res) => {
    const { id } = req.params;
    await CheckRecord(Post, id);
    console.log(id);
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json(post);
};

/**
 * @async
 * @route {PATCH} /post/likes/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves todocuments representing all post.
 */
const LikePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isUserLiked = post.like.includes(userId);
    const updateQuery = isUserLiked ? { $pull: { like: userId } } : { $addToSet: { like: userId } };
    const postup = await Post.findByIdAndUpdate(id,updateQuery, { new: true });

    res.status(200).json(postup);
};

export { getAllPosts, CreatePost, UpadetPost, DeletePost, LikePost, getPost };
