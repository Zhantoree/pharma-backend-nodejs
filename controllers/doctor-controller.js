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
}

export default new DoctorController()