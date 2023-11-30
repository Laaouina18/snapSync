import asynchandler from "express-async-handler";
import { create, update } from "../services/post.js";
import { validator, PostSchema } from "../validator/JoiSchemas.js";
import { CheckRecord } from "../services/helpers/helpers.js";
import Post from "../models/PostModel.js";

/**
 * Retrieves all posts.
 * @async
 * @route {GET} /post
 * @access public
 * @returns {Promise<Array<Document>>} A Promise that resolves to an array of documents representing all posts.
 */
const getAllPosts = asynchandler(async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

/**
 * CREATE new post.
 * @async
 * @route {POST} /post
 * @access public
 * @returns {Promise<Document>} A Promise that resolves to an array of documents representing all posts.
 */
const CreatePost = asynchandler(async (req, res) => {
    const body = req.body;
    validator(PostSchema, body);
    const post = await create(body);
    res.status(201).json(post);
});

/**
 * Update new post.
 * @async
 * @route {PATCH} /post/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves  documents representing post.
 */
const UpadetPost = asynchandler(async (req, res) => {
    validator(PostSchema, req.body);

    const { tags } = req.body;
    const tagsArray = tags.split(",");

    const body = { ...req.body, tags: tagsArray };
    const { id } = req.params;

    await CheckRecord(Post, id);
    const post = await update(id, body);
    res.status(200).json(post);
});

/**
 * Update new post.
 * @async
 * @route {DELETE} /post/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves to an array of documents representing all post.
 */

const DeletePost = asynchandler(async (req, res) => {
    const { id } = req.params;
    await CheckRecord(Post, id);
    console.log(id);
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json(post);
});

/**
 * incerement the like value by 1
 * @async
 * @route {PATCH} /post/likes/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves todocuments representing all post.
 */
const LikePost = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isUserLiked = post.like.includes(userId);
    const updateQuery = isUserLiked ? { $pull: { like: userId } } : { $addToSet: { like: userId } };
    const postup = await Post.findByIdAndUpdate(id,updateQuery, { new: true });

    res.status(200).json(postup);
});

export { getAllPosts, CreatePost, UpadetPost, DeletePost, LikePost };
