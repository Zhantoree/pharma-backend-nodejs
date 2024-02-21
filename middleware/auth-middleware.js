import ApiError from "../exceptions/api-error.js";
import tokenService from "../services/token-service.js";

export default function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1]

        if(!accessToken){
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            return next(ApiError.UnauthorizedError())
        }

        if(userData.isBanned) {
            return next(ApiError.BadRequest("You are banned"))
        }

        req.user = userData
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}