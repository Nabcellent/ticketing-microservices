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

    delete: async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.id)

        if (!order) throw new NotFoundError()
        if (order.user_id !== req.currentUser!.id) throw new NotAuthorizedError()

        res.send({})
    }
}