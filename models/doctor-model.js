import {Schema, model} from "mongoose";

const DoctorSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    specialization: {type: String, required: true},
    bio: {type: String, required: true},
    imageURL: {type: String, required: true},
    appointments: [{type: Schema.Types.ObjectId,ref: 'Appointment'}],
})

export default model('Doctor', DoctorSchema);