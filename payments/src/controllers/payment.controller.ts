import {Request, Response} from "express";
import {Order} from '../models/order';
import {BadRequestError, NotAuthorizedError, NotFoundError, Status} from '@nabz.tickets/common';
import {stripe} from '../stripe';
import {Payment} from '../models/payment';

export const PaymentController = {
    store: async (req: Request, res: Response) => {
        const {token, order_id} = req.body;

        const order = await Order.findById(order_id);

        if (!order) throw new NotFoundError();
        if (order.user_id !== req.currentUser!.id) throw new NotAuthorizedError();
        if (order.status === Status.ORDER_CANCELLED) throw new BadRequestError('Cannot pay for a cancelled order!');

        const charge = await stripe.charges.create({
            currency: 'kes',
            amount: order.price * 100,
            source: token
        });

        await Payment.create({
            order_id,
            stripe_id: charge.id
        });

        res.status(201).send({success: true});
    },
};
