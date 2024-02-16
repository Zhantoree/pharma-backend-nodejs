import Router from "express";
import userController from "../controllers/user-controller.js";


const router = new Router()
router.get('/:userId', userController.getAppointments)
router.get('/doctors/get', userController.getDoctors)
router.post('/appoint', userController.makeAppointment)
router.post('/cancel', userController.cancelAppointment)
router.post('/feedback', userController.giveFeedback)

export default router