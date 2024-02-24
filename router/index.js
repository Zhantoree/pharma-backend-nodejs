import Router from "express";
import userController from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = new Router()
router.get('/', authMiddleware, userController.getAppointments)
router.get('/doctors/get', userController.getDoctors)
router.post('/appoint', authMiddleware, userController.makeAppointment)
router.post('/cancel', authMiddleware, userController.cancelAppointment)
router.post('/feedback', authMiddleware, userController.giveFeedback)

export default router