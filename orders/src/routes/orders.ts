import {Router} from "express";
import {requireAuth, ValidateRequest} from "@nabz.tickets/common";
import {body} from "express-validator";
import {OrderController} from '../controllers/order.controller';

const router = Router();

router.get('/orders', OrderController.index);
router.get('/orders/:id', OrderController.show);

router.post('/orders', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required.'),
    body('price').isFloat({gt: 0}).withMessage('Price is required & must be greater than 0.')
], ValidateRequest, OrderController.store);

router.delete('/orders/:id', requireAuth, OrderController.delete);

export {router as orderRouter};