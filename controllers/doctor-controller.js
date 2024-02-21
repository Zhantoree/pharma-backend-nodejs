import DoctorService from "../services/doctor-service.js";

class DoctorController {
    async getAppointments(req, res, next) {
        try {
            const {id: userId} = req.user
            const apps = await DoctorService.getAppointments(userId)
            return res.json(apps)
        } catch (e) {
            next(e)
        }
    }
    async completeAppointment(req, res, next) {
        try {
            const {appId} = req.body
            const {userId} = req.user
            const completedApp = await DoctorService.completeAppointment(appId, userId)
            return res.json(completedApp)
        } catch (e) {
            next(e)
        }
    }

    async createBlog(req, res, next) {
        try {
            const {doctorId,
                title, content, date} = req.body
            const {id: userId} = req.user
            const newBlog = await DoctorService
                .createBlog(userId,
                title, content, date)
            return res.json(newBlog)
        } catch (e) {
            next(e)
        }
    }

    async commentBlog(req, res, next) {
        try {
            const {id: userId} = req.user
            const {blogId, parentCommentId, content, dateTime, replies} = req.body
            const newComment = await DoctorService.commentBlog(blogId, userId, parentCommentId, content, dateTime, replies)
            return res.json(newComment)
        } catch (e) {
            next(e)
        }
    }
}

export default new DoctorController()