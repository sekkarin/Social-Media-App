import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.Model'
import express, { Request, Response } from 'express'
import { log } from 'console'


export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        // log(id)
        const user = await User.findById(id).select("-password")

        res.status(200).json({ "user": user })
    } catch (error) {
        res.sendStatus(500)
    }
}

export const getUserFriends = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        // log("getUserFriends", user)
        if (!user) return res.sendStatus(403)

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map((friend) => {
            return {
                "_id": friend?._id,
                "lastname": friend?.lastName,
                "firstName": friend?.firstName,
                "occupation": friend?.occupation,
                "picturePath": friend?.picturePath,
                "location": friend?.location
            }
        })

        res.status(200).json(formattedFriends)

    } catch (error) {
        log(error)
        res.sendStatus(500)
    }
}
export const addRemoveFriend = async (req: Request, res: Response) => {
    console.log("addRemoveFriend start");
    try {

        const { id, friendId } = req.params;
        console.log(id, friendId);

        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (!user || !friend) return res.sendStatus(400)
        console.log("addRemoveFriend step 2");

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map((friend) => {
            // console.log(friend);
            return friend
        });

        res.status(200).json(formattedFriends);


    } catch (error) {

        console.log(error);

        res.sendStatus(500)
    }
}