import UserModel from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";
import appointmentModel from "../models/appointment-model.js";
import FeedbackModel from "../models/feedback-model.js";
import ExistCheck from "../exceptions/exist-check.js";
class UserService {

    async getAppointments(userId) {
        const monthData = new Date()
        monthData.setMonth(monthData.getMonth() - 1)
        const apps = await ExistCheck.checkAppointmentExist({dateTime: {$gte: monthData}})
        return apps
    }

    async getDoctors(page, pagesize) {
        const totalCount = await UserModel.count()
        if(!page || !pagesize) {
            const doctors = await UserModel.aggregate([
                {$limit: 4}
            ])

            return {
                total: totalCount,
                page: 1,
                pagesize: 4,
                doctors
            }
        }
        const doctors = await UserModel.aggregate([
            {$skip: (page - 1) * pagesize},
            {$limit: pagesize}
        ]);
        return {
            total: totalCount,
            page,
            pagesize,
            doctors
        }
    }

    async makeAppointment(doctorId, clientId, dateTime, reason) {
        const isExist = await ExistCheck.checkAppointmentExist({dateTime: dateTime, doctorId: doctorId})
        if(isExist) {
            throw ApiError.BadRequest("Запись на это время уже существует")
        }
        const app = await appointmentModel.create({doctorId, clientId, dateTime, status: "SCHEDULED", reason})
        return app
    }

    async cancelAppointment(appId) {
        const newApp = await ExistCheck.checkAppointmentExist({_id: appId})
        newApp.status = "CANCELLED"
        newApp.save()
        return newApp
    }

    async giveFeedback(doctorId, clientId, feedback, rating, date) {
        const candidate = await ExistCheck.checkFeedbackExist({doctorId: doctorId, date: date})
        if(candidate) {
            throw ApiError.BadRequest("Feedback has been already given")
        }
        const newFeedback = await FeedbackModel.create({doctorId, clientId, feedback, rating, date})
        return newFeedback;
    }

}

export default new UserService()