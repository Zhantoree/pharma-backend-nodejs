import userModel from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";
import ExistCheck from "../exceptions/exist-check.js";
import appointmentModel from "../models/appointment-model.js";
import FeedbackModel from "../models/feedback-model.js";
import BlogModel from "../models/blog-model.js";

class AdminService {
    async promoteDoctor(userId) {

        const newDoctor = await ExistCheck.checkUserExist({_id: userId})
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

    async demoteDoctor(userId) {
        const newDoctor = await ExistCheck.checkUserExist({_id: userId})
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

    async banUser(userId) {
        const candidate = await ExistCheck.checkUserExist({_id: userId})
        candidate.isBanned = true
        candidate.save()
        return candidate
    }
    async unBanUser(userId) {
        const candidate = await ExistCheck.checkUserExist({_id: userId})
        candidate.isBanned = false
        candidate.save()
        return candidate
    }

    async getClient(clientId) {
        const client = await ExistCheck.checkUserExist({_id: clientId})
        return client
    }

    async completeAppointment(appId, userId) {
        const app = await ExistCheck.checkAppointmentExist({_id: appId})
        app.status = "COMPLETE"
        app.save()
        return app
    }

    async deleteFeedback(feedbackId) {
        const feedback = await ExistCheck.checkFeedbackExist({_id: feedbackId})
        await FeedbackModel.deleteOne({_id: feedbackId})
        return true
    }
    async deleteBlog(blogId) {
        const blog = await ExistCheck.checkBlogExist({_id: blogId})
        await BlogModel.deleteOne({_id: blogId})
        return true
    }
}

export default new AdminService()