import {Schema, model} from 'mongoose'

const Role = new Schema({
    value: {type: String, value: 'ADMIN' | 'CLIENT' | 'DOCTOR', unique: true, default: 'CLIENT'}
})

export default model('Role', Role)