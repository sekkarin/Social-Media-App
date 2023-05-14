import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.Model'
import express, { Request, Response } from 'express'
import { log } from 'console'
import Post from '../models/Post.Model'


export const getFeedPosts = async (req: Request, res: Response) => {
    try {
        const post = await Post.find();
        res.status(200).json({ post })
    } catch (error) {
        res.sendStatus(404)
    }
}


export const getUserPost = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const post = await Post.find({ userId })
        res.status(200).json(post)


    } catch (error) {
        res.sendStatus(404)
    }
}
export const likepost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const post = await Post.findById(id)
        const isLiked = post?.likes?.get(userId)
        if (!post) {
            return res.sendStatus(403)
        }
        if (isLiked) {
            post.likes?.delete(userId)
        } else {
            post.likes?.set(userId, true)
        }
        const updatePost = await Post.findByIdAndUpdate(id,
            {
                likes: post.likes
            },
            { new: true })
        res.status(200).send(updatePost)
    } catch (error) {
        console.log(error);
        
        res.sendStatus(500)
    }
}
export const createPost = async (req: Request, res: Response) => {
    try {
        
        
        const { userId, description, picturePath } = req.body
    
        
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({'message':"not found user"})
        }
    
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath: picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        })
        await newPost.save()
        const post = await Post.find();
        res.status(200).json({ post: post })
    } catch (error) {
        // console.log("create post error");
        console.log(error);
        res.sendStatus(409)
    }
}