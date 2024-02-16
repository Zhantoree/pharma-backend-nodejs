import Router from "express";
import adminController from "../controllers/admin-controller.js";

const router = new Router()

router.get('/promotedoctor/:id', adminController.promoteDoctor)
router.get('/demotedoctor/:id', adminController.demoteDoctor)

export default router
