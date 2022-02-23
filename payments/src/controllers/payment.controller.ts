import {Request, Response} from "express";

export const PaymentController = {
    store: async (req: Request, res: Response) => {
        res.status(201).send({success: true});
    },
};
