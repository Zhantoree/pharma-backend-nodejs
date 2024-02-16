import UserModel from "../models/user-model.js";
import ApiError from "./api-error.js";
import AppointmentModel from "../models/appointment-model.js";
import BlogModel from "../models/blog-model.js";
import DoctorModel from "../models/doctor-model.js";
import FeedbackModel from "../models/feedback-model.js";

export default class ExistCheck {

    // Check for USERSSSSS
    static async checkUserExist (filter) {
        // Check existing by email
        const candidate = await UserModel.findOne(filter)
        if (!candidate) {
            throw ApiError.BadRequest("No user found")
        }
        return candidate
    }


    // Check for DOCTORSSS
    static async checkDoctorExist (filter) {
        // Check existing by email
        const candidate = await DoctorModel.findOne(filter)
        if (!candidate) {
            throw ApiError.BadRequest("No doctor found")
        }
        return candidate
    }
    static async checkAppointmentExist(filter) {
        const candidate = await AppointmentModel.findOne(filter)
        if(!candidate) {
            throw ApiError.BadRequest("No appointment found")
        }
        return candidate
    }
    static async checkBlogExist(filter) {
        const candidate = await BlogModel.findOne(filter)

        if(!candidate) {
             throw ApiError.BadRequest("No blog found")
        }
        return candidate
    }
    static async checkFeedbackExist(filter) {
        const candidate = await FeedbackModel.findOne(filter)

        if(!candidate) {
             throw ApiError.BadRequest("No feedback found")
        }
        return candidate
    }
}