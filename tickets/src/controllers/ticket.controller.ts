import {Request, Response} from "express";
import {Ticket} from "../models/tickets";
import {NotFoundError} from "@nabztickets/common";

export const TicketController = {
    index: async (req:Request, res:Response) => {
        const tickets = await Ticket.find({})

        res.send(tickets)
    },

    store: async (req: Request, res: Response) => {
        const {title, price} = req.body

        const ticket = Ticket.build({title, price, user_id: req.currentUser!.id})
        await ticket.save()

        res.status(201).send(ticket)
    },

    show: async (req:Request, res:Response) => {
        const ticket = await Ticket.findById(req.params.id)

        if(!ticket) throw new NotFoundError()

        res.send(ticket)
    }
}