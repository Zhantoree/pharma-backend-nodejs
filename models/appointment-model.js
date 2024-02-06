import {Schema, model} from "mongoose";

const AppointmentModel = new Schema({
    doctorId: {type: Schema.Types.ObjectId, required: true, ref: "Doctor"},
    clientId: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    dateTime: {type: Schema.Types.Date, required: true},
    status: {value: "SCHEDULED" | "CANCELLED" | "COMPLETE"},
    reason: {type: String, required: true}
}, {timestamps: true})

export default model("Appointment", AppointmentModel)