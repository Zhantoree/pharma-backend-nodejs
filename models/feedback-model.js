import {Schema, model} from "mongoose";

const FeedbackModel = new Schema({
    doctorId: {type: Schema.Types.ObjectId, ref: "Doctor", required: true},
    clientId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    feedback: {type: String, default: null},
    rating: {type: Number, value: 1 | 2 | 3 | 4 | 5, required: true},
    date: {type: Schema.Types.Date, required: true}
})

export default model('Feedback', FeedbackModel)