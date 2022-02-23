import {ExpirationCompleteEvent, Publisher, Subject} from '@nabz.tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subject.ExpirationComplete = Subject.ExpirationComplete;
}
