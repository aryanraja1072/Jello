import { StatusCodes } from "http-status-codes";
/*
TODO:

FIXME:

DONE:
- Errors thrown by authController.js are not handled by the error-handler middleware.
  -> Fix: explicitly call next(err) using try/catch in the login method( or other methods).
*/
const errorHandlerMiddleware = (err, req, res, next) => {
    console.error('Error:', err)
    const defaultError = {
        message: err.message || 'Something went wrong!',
        code: err.code || StatusCodes.INTERNAL_SERVER_ERROR
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