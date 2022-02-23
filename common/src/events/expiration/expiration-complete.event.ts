import {Subject} from '../../enums/subject';

export interface ExpirationCompleteEvent {
    subject: Subject.ExpirationComplete;
    data: {
        order_id: string;
    };
}
