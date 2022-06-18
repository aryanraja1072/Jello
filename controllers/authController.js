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

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new CustomAPIError(StatusCodes.BAD_REQUEST, "Please provide all the required fields!");
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new CustomAPIError(StatusCodes.NOT_FOUND, "User not found!");
        }
        const isValid = await user.comparePassword(password);
        if (!isValid) {
            throw new CustomAPIError(StatusCodes.UNAUTHORIZED, "Invalid password!");
        }

        const token = user.createJWT();
        user.password = undefined;
        return res.status(StatusCodes.OK).json({ user, token, location: user.location });
    } catch (err) {
        next(err);
    }


}

const updateUser = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { name, email, lastName, location } = req.body;
        if (!name || !email) {
            throw new CustomAPIError(StatusCodes.BAD_REQUEST, "Please provide all the required fields!");
        }
        const user = await User.findOne({ _id: userId });
        user.name = name;
        user.email = email;
        user.lastName = lastName;
        user.location = location;

        await user.save()
        const token = user.createJWT();
        res.status(StatusCodes.OK).json({ user, token, location: user.location });
    } catch (err) {
        next(err)
    }
}
/*
Issue: 
  - The error thrown by the login method is not handled by the error-handler middleware.
Fix: explicitly call next(err) using try/catch in the login method( or other methods).
*/


export { register, login, updateUser };