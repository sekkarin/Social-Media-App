import express from 'express';
import authRouter from './auth.Router';
import userRouter from './user.Router';
import postRounter from './post.Rounter';
const router = express.Router()

export default ():express.Router =>{
    authRouter(router)
    userRouter(router)
    postRounter(router)
    return router;
}