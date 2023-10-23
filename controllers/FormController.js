import {FormModel} from "../models/Form.js";

class FormController {
    async sendForm (req, res, next) {
        try {
            const {name, email, phone, subject, message} = req.body
            await FormModel.create({name, email, phone, subject, message})
            return res.json("Form sended")
        } catch (e) {
            console.log(e)
        }
    }
}

export default new FormController()
