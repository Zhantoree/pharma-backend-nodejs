import AdminService from "../services/admin-service.js";

class AdminController {
    async promoteDoctor(req, res, next) {
        try {
            const {id} = req.params
            const newDoctor = await AdminService.promoteDoctor(id)
            return res.json(newDoctor)
        } catch (e) {
            next(e)
        }
    }
    async demoteDoctor(req, res, next) {
        try {
            const {id} = req.params
            const user = await AdminService.demoteDoctor(id)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async
}

export default new AdminController()