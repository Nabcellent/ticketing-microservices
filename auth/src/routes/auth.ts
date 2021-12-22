import {Request, Response, Router} from 'express'
import validationMiddleware from '@/middleware/validation.middleware'
import validate from '@/resources/auth/auth.validation'

const router = Router()

router.get(`/users/current-user`, (req, res) => {
    res.send('Hi there')
})
router.get(`/users/sign-up`, validationMiddleware(validate.register), (req: Request, res: Response) => {
    const {email, password} = req.body

    console.log('creating a user');

    res.send({})
})
router.post(`/users/sign-in`, (req, res) => {
    res.send('Hi there')
})
router.get(`/users/sign-out`, (req, res) => {
    res.send('Hi there')
})

export {router as authRouter}