import DoctorService from "../service/doctor-service.js";

class DoctorController {
    async getAppointments(req, res, next) {
        try {
            const doctorId = req.params.id
            const apps = await DoctorService.getAppointments(doctorId)
            return res.json(apps)
        } catch (e) {
            next(e)
        }
    }
    async completeAppointment(req, res, next) {
        try {
            const {appId} = req.body
            const completedApp = await DoctorService.completeAppointment(appId)
            return res.json(completedApp)
        } catch (e) {
            next(e)
        }
    }

    async createBlog(req, res, next) {
        try {
            const {doctorId,
                title, content, date} = req.body
            const newBlog = await DoctorService
                .createBlog(doctorId,
                title, content, date)
            return res.json(newBlog)
        } catch (e) {
            next(e)
        }
    }

    async   commentBlog(req, res, next) {
        try {
            const {blogId, userId, parentCommentId, content, dateTime, replies} = req.body
            const newComment = await DoctorService.commentBlog(blogId, userId, parentCommentId, content, dateTime, replies)
            return res.json(newComment)
        } catch (e) {
            next(e)
        }
    }
}

export default new DoctorController()