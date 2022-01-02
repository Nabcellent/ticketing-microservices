import {Request, Response, Router} from "express";
import {requireAuth} from "@nabztickets/common";

const router = Router()

router.post('/tickets', requireAuth, (req:Request, res:Response) => {
    res.sendStatus(200)
})

export {router as ticketRouter }