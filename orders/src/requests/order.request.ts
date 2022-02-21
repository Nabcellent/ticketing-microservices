import {body} from 'express-validator';
import mongoose from 'mongoose';

export default {
    store: [
        body('ticket_id').not().isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('Ticket Id is required.'),
    ]
};