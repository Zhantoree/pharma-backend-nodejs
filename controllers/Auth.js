import {UserModel} from "../models/User.js";
import bcrypt from 'bcryptjs'

class Auth {
    async registration(req, res, next) {
        const {email, password} = req.body
        const candidate = await UserModel.findOne({email})
        if(candidate) {
            res.status(400).json({message: `User with email ${email} already exists`
        })
        }
        const hashedPassword = bcrypt.hash(password, 5)
        await UserModel.create({email, password: hashedPassword})
        return res.status(200).json({message: "User created successfully!"})
    }
}

export default new Auth()