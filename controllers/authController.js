import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from '../Errors/errors.js';

const register = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new CustomAPIError(StatusCodes.BAD_REQUEST, "Please provide all the required fields!");
        }
        const user = await User.create({ name, email, password });
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({
            user: {
                name: user.name,
                email: user.email,
                lastName: user.lastName,
                location: user.location
            }, token
        });
    } catch (err) {
        next(err);
    }



}

const login = async (req, res) => {
    res.send("login user")
}

const updateUser = async (req, res) => {
    res.send("update user")
}

export { register, login, updateUser };