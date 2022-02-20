import {Publisher} from "../../../common/src/events/core/base.publisher";
import {TicketCreatedEvent} from "../../../common/src/events/tickets/ticket-created.event";
import {Subject} from "../../../common/src/enums/subject";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated;
}
