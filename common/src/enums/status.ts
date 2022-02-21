export enum Status {
    //  The order has been created and the ticket being ordered has not been reserved.
    CREATED,

    //  The ticket being ordered has already been reserved or user has cancelled the order or order expires before payment.
    CANCELLED,

    //  The ticket has successfully been reserved
    AWAITING_PAYMENT,

    //  The ticket has been reserved & the user has made the payment.
    COMPLETE,
}
