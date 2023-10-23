import {Router} from "express";
import FormController from "../controllers/FormController.js";
import {check, validationResult} from "express-validator";
import Auth from "../controllers/Auth.js";

const router = new Router()
router.post('/about', FormController.sendForm)

export default router