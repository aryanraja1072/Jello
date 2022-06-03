import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../Errors/errors.js";
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new CustomAPIError(StatusCodes.UNAUTHORIZED, "Missing or invalid authorization header!");
        }
        const token = authHeader.split(' ')[1]

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            // attach the user request object
            // req.user = payload
            req.user = { userId: payload.userId }
            next()
        } catch (error) {
            console.log("JWT Error:", error)
            throw new CustomAPIError(StatusCodes.UNAUTHORIZED, "Invalid token!");
        }
    }
    catch (err) {
        next(err)
    }

}
export default auth;