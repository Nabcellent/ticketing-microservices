import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {RequestValidationError} from "../../utils/exceptions/request-validation.error";
import {DatabaseConnectionError} from "../../utils/exceptions/database-connection.error";

export function signUp(req: Request, res: Response) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }

    const {email, password} = req.body

    console.log('Creating a user...');
    throw new DatabaseConnectionError()

    res.send({})
}