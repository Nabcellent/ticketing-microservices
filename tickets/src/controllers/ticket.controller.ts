import {Request, Response} from "express";

export const TicketController = {
    store: (req: Request, res: Response) => {
        res.sendStatus(200)
    }
}