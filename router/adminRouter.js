import Router from "express";
import adminController from "../controllers/admin-controller.js";
import roleMiddleware from "../middleware/role-middleware.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = new Router()

router.get('/promotedoctor/:id', authMiddleware, roleMiddleware(["ADMIN"]), adminController.promoteDoctor)
router.get('/demotedoctor/:id', authMiddleware, roleMiddleware(["ADMIN"]),  adminController.demoteDoctor)
router.post('/banuser/', authMiddleware, roleMiddleware(["ADMIN"]),  adminController.banUser)
router.post('/unbanuser/', authMiddleware, roleMiddleware(["ADMIN"]),  adminController.unBanUser)
router.post('/clients/:clientId', authMiddleware, roleMiddleware(["ADMIN"]),  adminController.getClient)
router.post('/complete/appointment', authMiddleware, roleMiddleware(["ADMIN"]),  adminController.completeAppointment)
router.post('/delete/feedback', authMiddleware, roleMiddleware(["ADMIN"]),  adminController.deleteFeedback)
router.post('/delete/blog', authMiddleware, roleMiddleware(["ADMIN"]),  adminController.deleteBlog)

export default router
