import {Router} from "express";
import {requireAuth, ValidateRequest} from "@nabz.tickets/common";
import {body} from "express-validator";
import {OrderController} from '../controllers/order.controller';
import mongoose from 'mongoose';

const router = Router();

router.get('/orders', requireAuth, OrderController.index);
router.get('/orders/:id', OrderController.show);

router.post('/orders', requireAuth, [
    body('ticket_id').not().isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('Ticket Id is required.'),
], ValidateRequest, OrderController.store);

router.delete('/orders/:id', requireAuth, OrderController.delete);

export {router as orderRouter};