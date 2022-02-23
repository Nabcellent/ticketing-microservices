import mongoose from 'mongoose';

interface PaymentAttrs {
    order_id: string;
    stripe_id: string;
}

interface PaymentDoc extends mongoose.Document {
    order_id: string;
    stripe_id: string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
    build(attrs: PaymentAttrs): PaymentDoc;
}

const PaymentSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    stripe_id: {
        type: String,
        required: true
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;

            delete ret._id;
        }
    }
});

PaymentSchema.statics.build = (attrs: PaymentAttrs) => new Payment(attrs);

const Payment = mongoose.model<PaymentDoc, PaymentModel>('Payment', PaymentSchema);

export {Payment};
