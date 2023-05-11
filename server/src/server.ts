import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer';
import helmet from 'helmet'
import mordan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import express,{Request} from 'express';
import { register } from './controllers/auth.Controller';
import routers from './routers';
import multerFle from './helpers/multerFle';
import User from './models/User.Model';
import { posts, users } from './data';
import Post from './models/Post.Model';



dotenv.config()
const server = express()
server.use(express.json())
server.use(helmet())
server.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
server.use(morgan('common'))
server.use(bodyParser.json({limit:'30mb'}))
server.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
server.use(cors())
console.log(path.join(__dirname,'./public/assets'));

server.use("/assets",express.static(path.join(__dirname,'./public/assets')))





// router with files

server.use(routers())
// Mongoose setup

mongoose.connect(process.env.MONGO_URL as string)
.then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log("server listening on port 👌",process.env.PORT);
        // User.insertMany(users)
        // Post.insertMany(posts)
        
    })
})
.catch(error=>console.log(error))