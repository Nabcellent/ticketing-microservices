import {Subject} from "../core/subject";

export interface TicketCreatedEvent {
    subject: Subject.TicketCreated;
    data: {
        id: string|number;
        user_id: string|number;
        title: string;
        price: number;
    };
}
