import { register, login, updateUser } from '../controllers/authController.js';
import express from 'express';
import auth from '../middleware/auth.js';
import rateLimiter from 'express-rate-limit'

const authRouter = express.Router();
const apiLimiter = rateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again after 10 minutes',
})

authRouter.route('/register').post(apiLimiter, register);
authRouter.route('/login').post(apiLimiter, login);
authRouter.route('/updateUser').patch(auth, updateUser);

export default authRouter;