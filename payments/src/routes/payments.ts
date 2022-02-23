import {Router} from "express";
import {requireAuth, ValidateRequest} from "@nabz.tickets/common";
import {body} from "express-validator";
import {PaymentController} from '../controllers/payment.controller';

const router = Router()

router.get('/tickets', PaymentController.index)

router.get('/tickets/:id', PaymentController.show)

router.post('/tickets', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required.'),
    body('price').isFloat({gt: 0}).withMessage('Price is required & must be greater than 0.')
], ValidateRequest, PaymentController.store)

router.put('/tickets/:id', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required.'),
    body('price').isFloat({gt: 0}).withMessage('Price is required & must be greater than 0.')
], ValidateRequest, PaymentController.update)

export {router as paymentRouter}
