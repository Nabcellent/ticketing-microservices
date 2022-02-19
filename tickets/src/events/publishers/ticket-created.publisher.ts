import {Publisher, Subject, TicketCreatedEvent} from "@nabz.tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated;
}