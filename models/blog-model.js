import {Schema, model} from "mongoose";

const BlogModel = new Schema({
    doctorId: {type: Schema.Types.ObjectId, ref: "Doctor", required: true},
    appointmentId: {type: Schema.Types.ObjectId, ref: "Appointment", required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Schema.Types.Date, required: true}
})

export default model('Blog', BlogModel)