import {Schema, model} from "mongoose";

const DoctorSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    specialization: {type: String, required: true},

})

export default model('Doctor', DoctorSchema);