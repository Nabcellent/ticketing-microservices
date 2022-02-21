import mongoose from "mongoose";
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

interface TicketAttrs {
    user_id: string;
    title: string;
    price: number;
}

interface TicketDoc extends mongoose.Document {
    user_id: string;
    title: string;
    price: number;
    version: number;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const TicketSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
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
TicketSchema.plugin(updateIfCurrentPlugin);

TicketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs);

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);

export {Ticket};