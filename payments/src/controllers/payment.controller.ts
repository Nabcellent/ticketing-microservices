import {Request, Response} from "express";

export const PaymentController = {
    store: async (req: Request, res: Response) => {
        const {title, price} = req.body;

        res.status(201).send({});
    },
};
