import {Request, Response} from "express";
import {Ticket} from "../models/tickets";

export const TicketController = {
    store: async (req: Request, res: Response) => {
        const {title, price} = req.body

        const ticket = Ticket.build({title, price, user_id: req.currentUser!.id})
        await ticket.save()

        res.status(201).send(ticket)
    }
}