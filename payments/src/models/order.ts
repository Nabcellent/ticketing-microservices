import mongoose from "mongoose";
import {Status} from '@nabz.tickets/common';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

interface OrderAttrs {
    id: string;
    user_id: string;
    price: number;
    status: Status;
    version: number;
}

interface OrderDoc extends mongoose.Document {
    user_id: string;
    price: number;
    status: Status;
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
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(Status)
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;

            delete ret._id;
        }
    }
});

OrderSchema.set('versionKey', 'version');
OrderSchema.plugin(updateIfCurrentPlugin);
OrderSchema.statics.build = (attrs: OrderAttrs) => new Order({
    ...attrs,
    _id: attrs.id
});

const Order = mongoose.model<OrderDoc, OrderModel>('Order', OrderSchema);

export {Order};
