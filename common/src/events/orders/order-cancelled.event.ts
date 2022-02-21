import {Subject} from "../../enums/subject";

export interface OrderCancelledEvent {
    subject: Subject.OrderCancelled;
    data: {
        id: string;
        ticket: {
            id: string;
        }
    };
}