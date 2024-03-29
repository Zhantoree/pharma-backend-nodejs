export default class ApiError extends Error {
    status;
    errors;
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors
    }
    static UnauthorizedError () {
        return new ApiError(401, "Не авторизованный пользователь")
    }

    static BadRequest (message, errors=[]) {
        return new ApiError(500, message, errors)
    }

    static NoAccess() {
        return new ApiError(403, "You have no rights")
    }
}