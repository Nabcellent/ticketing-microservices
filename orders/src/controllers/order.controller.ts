import {Request, Response} from "express";
import {Order} from "../models/order";
import {BadRequestError, NotAuthorizedError, NotFoundError, Status} from "@nabz.tickets/common";
import {Ticket} from '../models/ticket';

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

export const OrderController = {
    index: async (req: Request, res: Response) => {
        const orders = await Order.find({user_id: req.currentUser!.id}).populate('ticket');

        res.send(orders);
    },

    store: async (req: Request, res: Response) => {
        const {ticket_id} = req.body;
        //  Attempt to find the ticket being ordered.
        const ticket = await Ticket.findById(ticket_id);
        if (!ticket) throw new NotFoundError();

        //  Ensure the ticket isn't already reserved.
        //  Run query to look at all orders. Find any without status of cancelled
        const isReserved = await ticket.isReserved();

        if (isReserved) throw new BadRequestError('Ticket is already reserved!');

        //  Calculation an expiration date for ticket.
        const expires_at = new Date();
        expires_at.setSeconds(expires_at.getSeconds() + EXPIRATION_WINDOW_SECONDS);

        //  Build and save the order to the DB
        const order = Order.build({
            user_id: req.currentUser!.id,
            status: Status.ORDER_CREATED,
            expires_at,
            ticket
        });
        await order.save();

        //  Publish an order:created event


        res.status(201).send(order);
    },

    show: async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.id).populate('ticket');

        if (!order) throw new NotFoundError();
        if (order.user_id !== req.currentUser!.id) throw new NotAuthorizedError();

        res.send(order);
    },

    delete: async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.id);

        if (!order) throw new NotFoundError();
        if (order.user_id !== req.currentUser!.id) throw new NotAuthorizedError();

        res.send({});
    }
};