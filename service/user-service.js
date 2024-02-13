import UserModel from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";
import Role from "../models/role-model.js";
import TokenModel from "../models/token-model.js";
import appointmentModel from "../models/appointment-model.js";
import FeedbackModel from "../models/feedback-model.js";
class UserService {

    async getAppointments(userId) {
        const monthData = new Date()
        monthData.setMonth(monthData.getMonth() - 1)
        const apps = await appointmentModel.find({dateTime: {$gte: monthData}})
        return apps
    }

    async makeAppointment(doctorId, clientId, dateTime, reason) {
        const isExist = await appointmentModel.findOne({dateTime: dateTime, doctorId: doctorId})
        if(isExist) {
            console.log("exception")
            throw ApiError.BadRequest("Запись на это время уже существует")
        }
        const app = await appointmentModel.create({doctorId, clientId, dateTime, status: "SCHEDULED", reason})
        return app
    }

    async cancelAppointment(appId) {
        const candidate = await appointmentModel.findOne({_id: appId})
        if(!candidate) {
            throw ApiError.BadRequest("There is no such appointment")
        }
        const newApp = await appointmentModel.updateOne({_id: appId},
            {
                $set: {status: "CANCELLED"}
            })
        return newApp
    }

    async giveFeedback(doctorId, clientId, feedback, rating, date) {
        const candidate = await FeedbackModel.findOne({doctorId: doctorId, date: date})
        if(candidate) {
            console.log(candidate)
            throw ApiError.BadRequest("Feedback has been already given")
        }
        const newFeedback = await FeedbackModel.create({doctorId, clientId, feedback, rating, date})
        return newFeedback;
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