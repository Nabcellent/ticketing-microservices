import {Subject} from "../../enums/subject";
import {Status} from '../../enums/status';

export interface OrderCreatedEvent {
    subject: Subject.OrderCreated;
    data: {
        id: string;
        user_id: string;
        status: Status;
        expires_at: string;
        version:number;
        ticket: {
            id: string;
            price: number
        }
    };
}
