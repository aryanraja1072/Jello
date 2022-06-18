class CustomAPIError extends Error {
    constructor(code, message) {
        super(message || 'Something went wrong!');
        this.code = code || StatusCodes.INTERNAL_SERVER_ERROR;
    }
}

export { CustomAPIError };