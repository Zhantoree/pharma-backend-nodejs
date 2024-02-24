import ApiError from "../exceptions/api-error.js";
import BlogModel from "../models/blog-model.js";
import CommentModel from "../models/comment-model.js";
import ExistCheck from "../exceptions/exist-check.js";
import DoctorModel from "../models/doctor-model.js";

class DoctorService {
    async getAppointments(userId) {
        const monthData = new Date()
        const {doctorId} = await DoctorModel.findOne({_id: userId})
        monthData.setMonth(monthData.getMonth() - 1)
        const apps = await ExistCheck.checkAppointmentExist({
            doctorId: doctorId,
            dateTime: {$gte: monthData}
        })
        return apps
    }

    async completeAppointment(appId, userId) {
        const doctorId = await ExistCheck.checkDoctorExist({userId: userId})
        const app = await ExistCheck.checkAppointmentExist({_id: appId})
        if(app.doctorId !== doctorId) {
            throw ApiError.NoAccess()
        }
        app.status = "COMPLETE"
        app.save()
        return app
    }

    async createBlog(userId, title, content, date) {
        const doctorId = await ExistCheck.checkDoctorExist({userId: userId})
        const newBlog = await BlogModel.create({doctorId, title, content, date})
        return newBlog;
    }

    async commentBlog(blogId, userId, parentCommentId, content, dateTime, replies) {
        if (parentCommentId) {
            const newReplyComment = await CommentModel.create({
                blogId, userId, parentCommentId, content, dateTime, replies
            })
            const existingComment = await CommentModel.findOne({_id: parentCommentId})
            existingComment.replies = [
                ...existingComment.replies, newReplyComment._id
            ]
            existingComment.save()
        }
        const newTopComment = await CommentModel.create({blogId, userId, content, dateTime})
        return newTopComment;
    }

}

export default new DoctorService()