import {Router} from 'express'
import {body} from "express-validator";
import * as AuthController from "../resources/auth/auth.controller";
import {ValidateRequest} from "../middlewares/validate-request.middleware";

const router = Router()

router.get(`/users/current-user`, (req, res) => {
    res.send('Hi there!')
})

router.post(`/users/sign-up`, [
    body('email')
        .isEmail().withMessage('Invalid email address.'),
    body('password')
        .trim().isLength({min:4, max:20}).withMessage('Password must be between 4 & 20 chars.')
], ValidateRequest, AuthController.signUp)

router.post(`/users/sign-in`, [
    body('email')
        .isEmail().withMessage('Invalid email address.'),
    body('password')
        .trim().notEmpty().withMessage('password is required.')
], ValidateRequest, AuthController.signIn)

router.get(`/users/sign-out`, (req, res) => {
    res.send('Hi there')
})

export {router as authRouter}