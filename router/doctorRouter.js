import {Router} from "express";
import DoctorController from "../controllers/doctor-controller.js";
import roleMiddleware from "../middleware/role-middleware.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = new Router()

router.get('/appointments/',  authMiddleware, roleMiddleware(["DOCTOR"]),  DoctorController.getAppointments)
router.post('/appointments/complete',  authMiddleware, roleMiddleware(["DOCTOR"]),  DoctorController.completeAppointment)
router.post('/blog/create', authMiddleware, roleMiddleware(["DOCTOR"]), DoctorController.createBlog)
router.post('/blog/comment', authMiddleware, roleMiddleware(["DOCTOR"]), DoctorController.commentBlog)
export default router