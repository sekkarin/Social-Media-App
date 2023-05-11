import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.Model'
import express from 'express'
import { log } from 'console'

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,

        } = req.body;
        // console.log(req.body);
        
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: passwordHash,
            picturePath: picturePath,
            friends: friends,
            location: location,
            occupation: occupation,
            viewedProfire: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        })
        const saveUser = await newUser.save()
        // console.log(saveUser);
        
        res.status(200).json({ "data": saveUser })
    } catch (error) {
        log(error)
        res.status(500).json(error)
    }
}
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {
            email,
            password,
        } = req.body;
        // console.log(req.body);
        const user = await User.findOne({ email: email })
        if (!user) return res.sendStatus(400);
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.sendStatus(403)
        // user.password.
        const token = jwt.sign({ id: user?._id },process.env.SECRET as string,{
            expiresIn:"30m"
        })
        // delete user.password
        res.status(200).json({ "token": token,"user":user})

    } catch (error) {
        log(error)
        res.status(500).json(error)
    }
}