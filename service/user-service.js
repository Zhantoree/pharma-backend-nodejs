import UserModel from "../models/user-model.js";
import bcrypt from 'bcrypt'
import {v4 as uuid} from "uuid";
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";
import Role from "../models/role-model.js";
import TokenModel from "../models/token-model.js";
class UserService {
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
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest("Такого пользователя не существует")
        }
        const isPasswordsEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordsEqual) {
            throw ApiError.BadRequest("Неверный пароль")
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        let user = await UserModel.findOne({activationLink})
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

    async getUsers() {
        const users = await UserModel.find();
        return users
    }
    async deleteUser(id) {
        const user = await UserModel.deleteOne({"id":id})
        const token = await TokenModel.deleteOne({"id": id})
        return {user: user, token: token}
    }
    async promoteUser(id) {
        const candidate = await UserModel.findById(id)
        if(!candidate) {
            throw ApiError.BadRequest("Пользователя не существует")
        }
        let isHaveRole = false;
        const moderatorRole = await Role.findOne({value: "MODERATOR"})
        const adminRole = await Role.findOne({value: "ADMIN"})
        candidate.roles.forEach(item => {
            if(item === moderatorRole.value || item === adminRole.value) {
                isHaveRole = true;
            }
        })
        if(isHaveRole === true) {
            throw ApiError.BadRequest("User is already MODERATOR")
        }
        candidate.roles.push(moderatorRole.value)
        await candidate.save()
        return candidate
    }
}

export default new UserService()