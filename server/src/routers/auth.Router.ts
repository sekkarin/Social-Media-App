
// import { register, login, logout } from '../controllers/authenticationController';
// import { query, body } from 'express-validator';
import express from 'express';
import { login, register } from '../controllers/auth.Controller';
import multerFle from '../helpers/multerFle';

export default (router: express.Router) => {
    router.post('/auth/register',multerFle.single('picture'),register),
    router.post('/auth/login', login)
    // router.get('/auth/logout', logout)
}