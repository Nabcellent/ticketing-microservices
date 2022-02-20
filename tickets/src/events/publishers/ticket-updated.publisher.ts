import {Publisher, Subject, TicketUpdatedEvent} from "@nabz.tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subject.TicketUpdated = Subject.TicketUpdated;
}