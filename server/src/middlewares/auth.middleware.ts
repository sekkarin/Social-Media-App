import { log } from "console";
import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
    user? : string|any;
    token?:string|any;
  }
export const verifyToken = (req: CustomRequest,res: Response,next: NextFunction)=>{
    
    
    try {
        let token = req.header("Authorization");

        if (!token) return res.sendStatus(403)
        
        
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token,process.env.SECRET as string)
        
        req.user = verified
        next()
    } catch (error) {
        log(error)
        res.status(500).json({ error: error})
    }
}