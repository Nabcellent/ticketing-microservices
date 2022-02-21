import mongoose from "mongoose";
import {Order} from './order';
import {Status} from '@nabz.tickets/common';

interface TicketAttrs {
    title: string;
    price: number;
}

interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;

    isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;

            delete ret._id;
            delete ret.__v;
        }
    }
});

TicketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs);
TicketSchema.methods.isReserved = async function (): Promise<boolean> {
    const existingOrder = await Order.findOne({ticket: this, status: {$not: Status.ORDER_CANCELLED}});

    return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);

export {Ticket, TicketDoc};