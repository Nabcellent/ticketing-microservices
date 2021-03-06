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
    version: number;

    isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    findByEvent(event: { id: string, version: number }): Promise<TicketDoc | null>;
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
            // delete ret.__v;
        }
    }
});

TicketSchema.set('versionKey', 'version');
// TicketSchema.plugin(updateIfCurrentPlugin);

TicketSchema.pre('save', function (done) {
    this.$where = {version: this.get('version') - 1};

    done();
});

TicketSchema.statics.findByEvent = (event: { id: string, version: number }) => {
    return Ticket.findOne({_id: event.id, version: event.version - 1});
};
TicketSchema.methods.isReserved = async function (): Promise<boolean> {
    const existingOrder = await Order.findOne({ticket: this, status: {$ne: Status.ORDER_CANCELLED}});

    return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);

export {Ticket, TicketDoc};