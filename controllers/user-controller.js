import userService from "../services/user-service.js";
import ApiError from "../exceptions/api-error.js";

class UserController {
    // Для всех

    async getAppointments(req, res, next) {
        try {
            const {id: userId} = req.user
            const apps = await userService.getAppointments(userId)
            return res.json(apps)
        } catch (e) {
            next(e)
        }
    }

    async getDoctors(req, res, next) {
        try {
            const {page, pagesize} = req.query
            const result = await userService.getDoctors(Number(page), Number(pagesize))
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async makeAppointment(req, res, next) {
        try {
            const {id: clientId} = req.user
            const {doctorId, dateTime, reason} = req.body
            const app = await userService.makeAppointment(doctorId, clientId, dateTime, reason, id);
            return res.json(app)
        } catch (e) {
            next(e)
        }
    }

    async cancelAppointment(req, res, next) {
        try {
            const {id: userId} = req.user
            const {appId} = req.body
            const cancelledApp = await userService.cancelAppointment(appId, userId)
            return res.json(cancelledApp)
        } catch (e) {
            next(e)
        }
    }

    async giveFeedback(req, res, next) {
        try {
            const {id: clientId} = req.user
            const {doctorId, feedback, rating, date} = req.body
            const result = await userService
                .giveFeedback(doctorId, clientId, feedback, rating, date)
            return res.json(doctorId, feedback, rating)
        } catch (e) {
            next(e)
        }
    }


}

export default new UserController()