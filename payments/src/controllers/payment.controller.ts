import {Request, Response} from "express";

export const PaymentController = {
    index: async (req: Request, res: Response) => {
        res.send({});
    },

    store: async (req: Request, res: Response) => {
        const {title, price} = req.body;

        res.status(201).send({});
    },

    show: async (req: Request, res: Response) => {
        res.send({});
    },

    update: async (req: Request, res: Response) => {
        res.send({});
    }
};
