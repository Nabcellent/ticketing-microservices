import {Request, Response} from "express";
import {Ticket} from "../models/tickets";
import {NotAuthorizedError, NotFoundError} from "@nabz.tickets/common";

export const TicketController = {
    index: async (req: Request, res: Response) => {
        const tickets = await Ticket.find({})

        res.send(tickets)
    },

    store: async (req: Request, res: Response) => {
        const {title, price} = req.body

        const ticket = Ticket.build({title, price, user_id: req.currentUser!.id})
        await ticket.save()
        // await new TicketCreatedPublisher(client).publish({
        //     id: ticket.id,
        //     title: ticket.title,
        //     price: ticket.price,
        //     user_id: ticket.user_id
        // })

        res.status(201).send(ticket)
    },

    show: async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id)

        if (!ticket) throw new NotFoundError()

        res.send(ticket)
    },

    update: async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id)

        if (!ticket) throw new NotFoundError()
        if (ticket.user_id !== req.currentUser!.id) throw new NotAuthorizedError()

        ticket.set({
            title: req.body.title,
            price: req.body.price
        })
        await ticket.save()

        res.send(ticket)
    }
}