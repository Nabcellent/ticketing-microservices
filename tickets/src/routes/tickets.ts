import {Router} from "express";
import {requireAuth, ValidateRequest} from "@nabz.tickets/common";
import {body} from "express-validator";
import {TicketController} from '../controllers/ticket.controller'

const router = Router()

router.get('/tickets', TicketController.index)

router.get('/tickets/:id', TicketController.show)

router.post('/tickets', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required.'),
    body('price').isFloat({gt: 0}).withMessage('Price is required & must be greater than 0.')
], ValidateRequest, TicketController.store)

router.put('/tickets/:id', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required.'),
    body('price').isFloat({gt: 0}).withMessage('Price is required & must be greater than 0.')
], ValidateRequest, TicketController.update)

export {router as ticketRouter}