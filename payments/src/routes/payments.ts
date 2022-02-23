import {Router} from "express";
import {requireAuth, ValidateRequest} from "@nabz.tickets/common";
import {body} from "express-validator";
import {PaymentController} from '../controllers/payment.controller';

const router = Router()

router.post('/payments', requireAuth, [
    body('token').not().isEmpty().withMessage('Token is required.'),
    body('order_id').not().isEmpty().withMessage('Order id is required.')
], ValidateRequest, PaymentController.store)

export {router as paymentRouter}
