import {Request, Response} from "express";
import {Order} from "../models/order";
import {NotAuthorizedError, NotFoundError} from "@nabz.tickets/common";
import {Ticket} from '../models/ticket';

export const OrderController = {
    index: async (req: Request, res: Response) => {
        const tickets = await Order.find({})

        res.send(tickets)
    },

    store: async (req: Request, res: Response) => {
        const {ticket_id} = req.body
        //  Attempt to find the ticket being ordered.
        const ticket = await Ticket.findById(ticket_id)
        if(!ticket) throw new NotFoundError()

        //  Ensure the ticket isn't already reserved.

        //  Calculation an expiration date for ticket.

        //  Build and save the order to the DB

        //  Publish an order:created event


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