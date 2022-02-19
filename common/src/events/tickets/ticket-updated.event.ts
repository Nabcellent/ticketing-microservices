import {Subject} from "../core/subject";

export interface TicketUpdatedEvent {
    subject: Subject.TicketUpdated;
    data: {
        id: string;
        user_id: string;
        title: string;
        price: number;
    };
}
