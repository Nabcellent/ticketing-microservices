import {Request, Response} from "express";
import {User} from "../../models/user";
import {BadRequestError} from "@nabztickets/common";
import jwt from 'jsonwebtoken'
import {PasswordService} from "../../services/password.service";

export async function signUp(req: Request, res: Response) {
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

export async function signIn(req: Request, res: Response) {
    const {email, password} = req.body

    const existingUser = await User.findOne({email});

    if (!existingUser) throw new BadRequestError('Invalid credentials!');

    const passwordsMatch = await PasswordService.compare(existingUser.password, password)

    if (!passwordsMatch) throw new BadRequestError('Invalid credentials!')

    //  Generate JWT
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!)

    //  Store JWT on session
    req.session = {jwt: userJwt}

    res.status(200).send(existingUser)
}

export const getCurrentUser = (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null})
}

export const signOut = (req:Request, res:Response) => {
    req.session = null

    res.send({})
}