import {Request, Response} from "express";
import {Ticket} from "../models/ticket";
import {BadRequestError, NotAuthorizedError, NotFoundError} from "@nabz.tickets/common";
import {TicketCreatedPublisher} from "../events/publishers/ticket-created.publisher";
import {natsWrapper} from '../nats-wrapper';
import {TicketUpdatedPublisher} from '../events/publishers/ticket-updated.publisher';

export const TicketController = {
    index: async (req: Request, res: Response) => {
        const tickets = await Ticket.find({order_id: undefined});

        res.send(tickets);
    },

    store: async (req: Request, res: Response) => {
        const {title, price} = req.body;

        const ticket = Ticket.build({title, price, user_id: req.currentUser!.id});
        await ticket.save();
        await new TicketCreatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            user_id: ticket.user_id,
            version: ticket.version
        });

        res.status(201).send(ticket);
    },

    show: async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) throw new NotFoundError();

        res.send(ticket);
    },

    update: async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) throw new NotFoundError();

        if (ticket.order_id) throw new BadRequestError('Ticket is reserved.');

        if (ticket.user_id !== req.currentUser!.id) throw new NotAuthorizedError();

        ticket.set({
            title: req.body.title,
            price: req.body.price
        });
        await ticket.save();

        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            user_id: ticket.user_id,
            version: ticket.version
        });

        res.send(ticket);
    }
};