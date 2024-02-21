import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error.js";
import AuthService from "../services/auth-service.js";

class AuthController {
    async registration(req,res,next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError
                    .BadRequest("Ошибка при валидации",errors.array()))
            }
            const {email, password, username, profile} = req.body;
            const userData = await AuthService.registration(email, password, username, profile)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async login(req,res,next) {
        try {
            const {email, password} = req.body
            const userData = await AuthService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async logout(req,res,next) {
        try {
            const {refreshToken} = req.cookies
            const tokenData = await AuthService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(tokenData)

        } catch (e) {
            next(e)
        }
    }
    async activate(req,res,next) {
        try {
            const activationLink = req.params.link
            await AuthService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }
    async refresh(req,res,next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await AuthService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()