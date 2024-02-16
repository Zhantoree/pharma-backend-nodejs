import ApiError from "../exceptions/api-error.js";
import tokenService from "../services/token-service.js";

export default function (roles) {
    return function (req, res, next) {
        if(req.method === "OPTIONS"){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return next(ApiError.UnauthorizedError())
            }
            const {roles: userRoles} = tokenService.validateAccessToken(token)

            let hasRole = false
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true
                }
            })
            if(!hasRole) {
                return next(ApiError.UnauthorizedError())
            }
            next();
        } catch (e) {
            return next(ApiError.BadRequest(e.message, e))
        }
    }
}