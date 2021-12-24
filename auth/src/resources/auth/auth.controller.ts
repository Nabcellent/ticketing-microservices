import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {RequestValidationError} from "../../utils/exceptions/request-validation.error";
import {User} from "../../models/user";
import {BadRequestError} from "../../utils/exceptions/bad-request.error";
import jwt from 'jsonwebtoken'

export async function signUp(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new RequestValidationError(errors.array())

    const {email, password} = req.body

    const existingUser = await User.findOne({email})

    if (existingUser) throw new BadRequestError('Email already in use.')

    const user = User.build({email, password})
    await user.save()

    //  Generate JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!)

    //  Store JWT on session
    req.session = {jwt: userJwt}

    res.status(201).send(user)
}