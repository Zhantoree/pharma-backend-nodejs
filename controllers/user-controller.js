import userService from "../service/user-service.js";
import DoctorService from "../service/doctor-service.js";

class UserController {
    // Для всех

    async getAppointments(req, res, next) {
        try {
            const {userId} = req.body
            const apps = await userService.getAppointments(userId)
            return res.json(apps)
        } catch (e) {
            next(e)
        }
    }

    async makeAppointment(req, res, next) {
        try {
            const {doctorId, clientId, dateTime, reason} = req.body
            const app = await userService.makeAppointment(doctorId, clientId, dateTime, reason);
            return res.json(app)
        } catch (e) {
            next(e)
        }
    }

    async cancelAppointment(req, res, next) {
        try {
            const {appId} = req.body
            const cancelledApp = await userService.cancelAppointment(appId)
            return res.json(cancelledApp)
        } catch (e) {
            next(e)
        }
    }

    async giveFeedback(req, res, next) {
        try {
            const {doctorId, clientId, feedback, rating, date} = req.body
            const result = await userService
                .giveFeedback(doctorId, clientId, feedback, rating, date)
            return res.json(doctorId, feedback, rating)
        } catch (e) {
            next(e)
        }
    }


    async promoteUser(req, res, next) {
        try {
            const userId = req.params.id
            const userPromote = await userService.promoteUser(userId)
            return res.json(userPromote)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()