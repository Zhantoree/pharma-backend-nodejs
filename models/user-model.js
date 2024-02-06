import {Schema, model} from 'mongoose'


const UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isBanned: {type: Boolean, default: false},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    roles: [{type: String, value: 'ADMIN' | 'CLIENT' | 'DOCTOR', ref: 'Role'}],
    profile: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        gender: {type: String, value: "MALE" | "FEMALE", default: null},
        contactNumber: {type: String, default: null},
        address: {type: String, default: null}
    }
})

export default model('User', UserSchema)