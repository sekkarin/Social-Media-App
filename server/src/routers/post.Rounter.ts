import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import { createPost, getFeedPosts, getUserPost,likepost } from '../controllers/post.Controller';
import multerFle from '../helpers/multerFle';
export default (router: express.Router) => {
    // read
    router.get('/posts',verifyToken,getFeedPosts)
    router.get('/posts/:userId/posts',verifyToken,getUserPost)

    // update
    router.patch('/posts/:id/like',verifyToken,likepost)
    
    router.post('/posts',verifyToken,multerFle.single("picture"),createPost)
    // app.post("/posts", verifyToken, upload.single("picture"), createPost);



}