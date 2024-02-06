import UserService from "../service/user-service.js";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error.js";
import userService from "../service/user-service.js";
import roleModel from "../models/role-model.js";

class UserController {
    // Для всех
    async registration(req,res,next) {
        try {
            console.log(req.body, "REQUEST")
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError
                    .BadRequest("Ошибка при валидации",errors.array()))
            }
            const {email, password, username, profile} = req.body;
            const userData = await UserService.registration(email, password, username, profile)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async login(req,res,next) {
        try {
            const {email, password} = req.body
            const userData = await UserService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async logout(req,res,next) {
        try {
            const {refreshToken} = req.cookies
            const tokenData = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(tokenData)

        } catch (e) {
            next(e)
        }
    }
    async activate(req,res,next) {
        try {
            const activationLink = req.params.link
            await UserService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)

        }
    }
    async refresh(req,res,next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req,res,next) {
        try {
            const users = await userService.getUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id
            const userDelete = await userService.deleteUser(userId)
            return res.json(userDelete)
        } catch (e) {
            next(e)
        }
    }

    async promoteUser(req, res, next) {
        try {
            const userId = req.params.id
            const userPromote = await userService.promoteUser(userId)
            return res.json(userPromote)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()