export enum Subject {
    TicketCreated = 'ticket:created',
    OrderUpdated = 'order:updated'
}

const printSub = (subject:Subject) => {

}

printSub(Subject.OrderUpdated)
