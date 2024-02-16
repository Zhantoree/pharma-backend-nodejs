import userModel from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";
import ExistCheck from "../exceptions/exist-check.js";

class AdminService {
    async promoteDoctor(id) {

        const newDoctor = await ExistCheck.checkUserExist({_id: id})
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
        const newDoctor = await ExistCheck.checkUserExist({_id: id})
        let isDoctor = false

        newDoctor.roles = newDoctor.roles.map(role => {
            if(role === "DOCTOR") {
                isDoctor = true
            }
            if(role !== "DOCTOR"){
                return role
            }
        })
        if(!isDoctor){
            throw ApiError.BadRequest("User was not a doctor")
        }
        newDoctor.save()
        return newDoctor

    }
}

export default new AdminService()