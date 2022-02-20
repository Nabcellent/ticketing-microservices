import {Request, Response} from "express";
import {Order} from "../models/order";
import {NotAuthorizedError, NotFoundError} from "@nabz.tickets/common";

export const OrderController = {
    index: async (req: Request, res: Response) => {
        const tickets = await Order.find({})

        res.send(tickets)
    },

    store: async (req: Request, res: Response) => {
        const {title, price} = req.body

        const ticket = Order.build({title, price, user_id: req.currentUser!.id})
        await ticket.save()

        res.status(201).send(ticket)
    },

    show: async (req: Request, res: Response) => {
        const ticket = await Order.findById(req.params.id)

        if (!ticket) throw new NotFoundError()

        res.send(ticket)
    },

    update: async (req: Request, res: Response) => {
        const ticket = await Order.findById(req.params.id)

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