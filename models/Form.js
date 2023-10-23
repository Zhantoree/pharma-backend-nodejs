import {Schema, model} from "mongoose";

const FormSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    subject: {type: String, required: true},
    message: {type: String, required: true},
})

export const FormModel =  model('Form', FormSchema)