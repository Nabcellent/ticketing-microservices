import {Subject} from "./subject";
import {Stan} from "node-nats-streaming";

interface Event {
    subject: Subject;
    data: any;
}

export abstract class Publisher<T extends Event> {
    abstract subject: T['subject']
    #client: Stan

    constructor(client: Stan) {
        this.#client = client
    }

    publish(data: T['data']) {
        this.#client.publish(this.subject, JSON.stringify(data), () => {
            console.log('Event Published!')
        })
    }
}
