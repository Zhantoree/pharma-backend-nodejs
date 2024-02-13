import AppointmentModel from "../models/appointment-model.js";
import ApiError from "../exceptions/api-error.js";
import appointmentModel from "../models/appointment-model.js";

class DoctorService {
    async getAppointments(id) {
        const monthData = new Date()
        monthData.setMonth(monthData.getMonth() - 1)
        const apps = await AppointmentModel.find({doctorId: id,
            dateTime: {$gte: monthData}})
        if(!apps) {
            throw ApiError.BadRequest("No data found")
        }
        return apps
    }

    async completeAppointment(appId) {
        const candidate = await appointmentModel.findOne({_id: appId})
        console.log(candidate)
        if(!candidate) {
            console.log(candidate, appId)
            throw ApiError.BadRequest("There is no such appointment")
        }
        console.log("before", candidate)

        const newApp = await appointmentModel.updateOne({_id: appId},
            {
                $set: {status: "COMPLETE"}
            })
        console.log("after", newApp)

        return newApp
    }
}

export default new DoctorService()