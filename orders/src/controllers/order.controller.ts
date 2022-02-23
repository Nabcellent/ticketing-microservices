import {Request, Response} from "express";
import {Order} from "../models/order";
import {BadRequestError, NotAuthorizedError, NotFoundError, Status} from "@nabz.tickets/common";
import {Ticket} from '../models/ticket';
import {OrderCreatedPublisher} from '../events/publishers/order-created.publisher';
import {natsWrapper} from '../nats-wrapper';
import {OrderCancelledPublisher} from '../events/publishers/order-cancelled.publisher';

const EXPIRATION_WINDOW_SECONDS = 1 * 60;

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

        //  Publish an order created event
        new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            status: order.status,
            user_id: order.user_id,
            expires_at: order.expires_at.toISOString(),
            version: order.version,
            ticket: {
                id: ticket.id,
                price: ticket.price
            }
        });

        res.status(201).send(order);
    },

    show: async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.id).populate('ticket');

        if (!order) throw new NotFoundError();
        if (order.user_id !== req.currentUser!.id) throw new NotAuthorizedError();

        res.send(order);
    },

    destroy: async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.id).populate('ticket');

        if (!order) throw new NotFoundError();
        if (order.user_id !== req.currentUser!.id) throw new NotAuthorizedError();

        order.status = Status.ORDER_CANCELLED;
        await order.save();

        //  Publish an order cancelled event
        new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id
            }
        });

        res.status(204).send(order);
    }
};