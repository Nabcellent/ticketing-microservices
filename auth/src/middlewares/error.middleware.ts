import {NextFunction, Request, Response} from "express";
import {RequestValidationError} from "../utils/exceptions/request-validation.error";
import {DatabaseConnectionError} from "../utils/exceptions/database-connection.error";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    const message = error.message || 'Something went wrong';

    if (error instanceof RequestValidationError) {
        return res.status(error.statusCode).send({errors: error.serializeErrors()})
    }

    if (error instanceof DatabaseConnectionError) {
        return res.status(error.statusCode).send({errors: error.serializeErrors()})
    }


    res.status(400).send({errors: [{message}]})
}

export default errorHandler
