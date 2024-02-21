import UserModel from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import Role from "../models/role-model.js";
import mailService from "./mail-service.js";
import UserDto from "../dtos/user-dto.js";
import tokenService from "./token-service.js";
import ExistCheck from "../exceptions/exist-check.js";

class AuthService {
    async registration(email, password, username, profile ) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest("Пользователь с такой почтой уже существует")
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid();

        const userRoles = await Role.findOne({value: "CLIENT"})
        const user = await UserModel.create({email, password: hashPassword, activationLink, roles: [userRoles.value], username: username, profile: profile})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async login(email, password) {
        const user = await ExistCheck.checkUserExist({email: email})
        const isPasswordsEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordsEqual) {
            throw ApiError.BadRequest("Неверный пароль")
        }
        if(user.isBanned) {
            throw ApiError.BadRequest("You are banned")
        }
        const userDto = new UserDto(user)
        console.log(user, "in login")
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        let user = await ExistCheck.checkUserExist({activationLink: activationLink})
        if (!user) {
            throw ApiError.BadRequest("Такого пользователя не существует")
        }
        user.isActivated = true;
        await user.save();
    }

    async logout(refreshToken) {
        let token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        if(!userData) {
            throw ApiError.UnauthorizedError()
        }
        const tokenFromDb = tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
}

export default new AuthService()