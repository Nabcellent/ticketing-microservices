import {Subject} from "../../enums/subject";

export interface PaymentCreatedEvent {
    subject: Subject.PaymentCreated;
    data: {
        id: string;
        order_id: string;
        stripe_id: string;
    };
}
