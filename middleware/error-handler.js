import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log('Error:', err)
    const defaultError = {
        message: err.message || 'Something went wrong!',
        code: err.code || 500
    }
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((item) => item.message);
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors });
    }
    if (err.code && err.code === 11000) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: `${Object.keys(err.keyValue)} field has to be unique.` });
    }
    res.status(defaultError.code).json({ message: defaultError.message });
}
export default errorHandlerMiddleware;