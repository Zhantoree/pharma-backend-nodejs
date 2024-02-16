import userModel from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";

class AdminService {
    async promoteDoctor(id) {
        const newDoctor = await userModel.findOne({_id: id})
        newDoctor.roles.forEach(role => {
            if(role === "DOCTOR") {
                throw ApiError.BadRequest("User is already a doctor")
            }
        })
        newDoctor.roles = [
            ...newDoctor.roles, 'DOCTOR'
        ]
        newDoctor.save()
        return newDoctor
    }

    async demoteDoctor(id) {
        const newDoctor = await userModel.findOne({_id: id})
        let res = false

        newDoctor.roles = newDoctor.roles.map(role => {
            if(role === "DOCTOR") {
                res = true
            }
            if(role !== "DOCTOR"){
                return role
            }
        })
        if(!res){
            throw ApiError.BadRequest("User is already a doctor")
        }
        newDoctor.save()
        return newDoctor

    }
}

export default new AdminService()