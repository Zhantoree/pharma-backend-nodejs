import AppointmentModel from "../models/appointment-model.js";
import ApiError from "../exceptions/api-error.js";
import appointmentModel from "../models/appointment-model.js";
import BlogModel from "../models/blog-model.js";
import CommentModel from "../models/comment-model.js";
import ExistCheck from "../exceptions/exist-check.js";

class DoctorService {
    async getAppointments(id) {
        const monthData = new Date()
        monthData.setMonth(monthData.getMonth() - 1)
        const apps = await ExistCheck.checkAppointmentExist({
            doctorId: id,
            dateTime: {$gte: monthData}
        })
        return apps
    }

    async completeAppointment(appId) {
        const candidate = await ExistCheck.checkAppointmentExist({_id: appId})
        const newApp = await appointmentModel.updateOne({_id: appId},
            {
                $set: {status: "COMPLETE"}
            })
        return newApp
    }

    async createBlog(doctorId, title, content, date) {
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