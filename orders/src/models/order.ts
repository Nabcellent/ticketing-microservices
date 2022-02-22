import mongoose from "mongoose";
import {Status} from '@nabz.tickets/common';
import {TicketDoc} from './ticket';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

interface OrderAttrs {
    user_id: string;
    status: Status;
    expires_at: Date;
    ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
    user_id: string;
    status: Status;
    expires_at: Date;
    ticket: TicketDoc;
    version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(Status),
        default: Status.ORDER_CREATED
    },
    expires_at: {
        type: mongoose.Schema.Types.Date,
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
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

OrderSchema.set('versionKey', 'version');
OrderSchema.plugin(updateIfCurrentPlugin);
OrderSchema.statics.build = (attrs: OrderAttrs) => new Order(attrs);

const Order = mongoose.model<OrderDoc, OrderModel>('Order', OrderSchema);

export {Order};