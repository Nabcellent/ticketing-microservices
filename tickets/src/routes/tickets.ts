import {Router} from "express";
import {requireAuth, ValidateRequest} from "@nabztickets/common";
import {body} from "express-validator";
import {TicketController} from '../controllers/ticket.controller'

const router = Router()

router.post('/tickets', requireAuth, [
        body('title').not().isEmpty().withMessage('Title is required.'),
        body('price').isFloat({gt: 0}).withMessage('Price must be greater than 0')
    ], ValidateRequest, TicketController.store)

router.get('/tickets/:id', TicketController.show)

export {router as ticketRouter}