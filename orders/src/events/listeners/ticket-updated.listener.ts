import {Listener, Subject, TicketUpdatedEvent} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';
import {QueueGroupName} from '../../../../common/src/enums/queue-group-name';
import {Ticket} from '../../models/ticket';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subject.TicketUpdated = Subject.TicketUpdated;
    queueGroupName = QueueGroupName.OrderService;

    async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
        const {title, price, version} = data;
        const ticket = await Ticket.findByEvent(data);

        if (!ticket) throw new Error('Ticket not found');

        ticket.set({title, price, version});
        await ticket.save();

        msg.ack();
    }
}