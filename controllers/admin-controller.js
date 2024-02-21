import AdminService from "../services/admin-service.js";
import ExistCheck from "../exceptions/exist-check.js";
import adminService from "../services/admin-service.js";
import ApiError from "../exceptions/api-error.js";
import DoctorService from "../services/doctor-service.js";

class AdminController {
    async promoteDoctor(req, res, next) {
        try {
            const {id} = req.params
            const newDoctor = await AdminService.promoteDoctor(id)
            return res.json(newDoctor)
        } catch (e) {
            next(e)
        }
    }
    async demoteDoctor(req, res, next) {
        try {
            const {id} = req.params
            const user = await AdminService.demoteDoctor(id)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async banUser(req, res, next) {
        try {
            const {userId} = req.body
            if(userId === req.user.id){
                next(ApiError.BadRequest("Don't ban your self, stupid"))
            }
            const bannedUser = await AdminService.banUser(userId)
            return res.json(bannedUser)
        } catch (e) {
            next(e)
        }
    }
    async unBanUser(req, res, next) {
        try {
            const {userId} = req.body
            const bannedUser = await AdminService.unBanUser(userId)
            return res.json(bannedUser)
        } catch (e) {
            next(e)
        }
    }

    async getClient(req, res, next) {
        try {
            const {clientId} = req.params
            const client = await adminService.getClient(clientId)
            return res.json(client)
        } catch (e) {
            next(e)
        }
    }

    async completeAppointment(req, res, next) {
        try {
            const {appId} = req.body
            const {userId} = req.user
            const completedApp = await AdminService.completeAppointment(appId, userId)
            return res.json(completedApp).status(200)
        } catch (e) {
            next(e)
        }
    }

    async deleteFeedback(req, res, next) {
        try {
            const {feedbackId} = req.body
            const isDeleted = await AdminService.deleteFeedback(feedbackId)
            return res.json("Feedback successfully deleted").status(200)
        } catch (e) {
            next(e)
        }
    }
    async deleteBlog(req, res, next) {
        try {
            const {blogId} = req.body
            const isDeleted = await AdminService.deleteBlog(blogId)
            return res.json("Blog post successfully deleted").status(200)
        } catch (e) {
            next(e)
        }
    }

}

export default new AdminController()