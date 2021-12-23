import {NextFunction, Request, Response} from "express";
import {CustomError} from "../utils/exceptions/custom.error";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    const message = error.message || 'Something went wrong';

    if (error instanceof CustomError) {
        return res.status(error.statusCode).send({errors: error.serializeErrors()})
    }

    res.status(400).send({errors: [{message}]})
}

export default errorHandler
