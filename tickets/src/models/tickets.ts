import mongoose from "mongoose";

interface TicketAttrs {
    user_id: string
    title: string;
    price: number
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc
}

interface TicketDoc extends mongoose.Document {
    user_id: string
    title: string;
    price: number
}

const TicketSchema = new mongoose.Schema({
    user_id: {

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
            ret.id = ret._id

            delete ret._id
            delete ret.__v
        }
    }
})

TicketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema)

export { Ticket }