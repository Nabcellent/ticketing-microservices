import {Router} from "express";
import {requireAuth, ValidateRequest} from "@nabz.tickets/common";
import {OrderController} from '../controllers/order.controller';
import OrderRequest from '../requests/order.request';

const router = Router();

router.get('/orders', requireAuth, OrderController.index);
router.get('/orders/:id', OrderController.show);
router.post('/orders', requireAuth, OrderRequest.store, ValidateRequest, OrderController.store);
router.delete('/orders/:id', requireAuth, OrderController.delete);

export {router as orderRouter};