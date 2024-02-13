import {Router} from "express";
import DoctorController from "../controllers/doctor-controller.js";

const router = new Router()

router.get('/appointments/:id', DoctorController.getAppointments)
router.post('/appointments/complete', DoctorController.completeAppointment)

export default router