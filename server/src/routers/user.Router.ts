import express from 'express';
import { getUser,addRemoveFriend,getUserFriends } from '../controllers/user.Controller';
import { verifyToken } from '../middlewares/auth.middleware';

export default (router: express.Router) => {
    router.get('/user/:id',verifyToken,getUser)
    router.get('/user/:id/friends',verifyToken,getUserFriends)
    router.patch('/user/:id/:friendId',verifyToken,addRemoveFriend)
}