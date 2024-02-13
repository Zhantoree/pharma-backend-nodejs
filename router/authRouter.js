import {Router} from "express";
import {body} from "express-validator";
import UserController from "../controllers/user-controller.js";
import AuthController from "../controllers/auth-controller.js";

const router = new Router()

router.post('/registration',
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 32}),
    AuthController.registration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/activate/:link', AuthController.activate)
router.get('/refresh', AuthController.refresh)
export default router