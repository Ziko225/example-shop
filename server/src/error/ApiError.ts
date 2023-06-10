class ApiError extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message = "The server cannot process the request due to something that is perceived to be a client error / invalid validation") {
        return new ApiError(400, message);
    }

    static Unauthorized(message = "Unauthorized. Please login first") {
        return new ApiError(401, message);
    }

    static forbidden(message = "Access denied") {
        return new ApiError(403, message);
    }

    static notFound(message = "The server cannot find the requested resource") {
        return new ApiError(404, message);
    }

    static internal(message = "The server has encountered a situation it does not know how to handle.") {
        return new ApiError(500, message);
    }
}

export default ApiError;