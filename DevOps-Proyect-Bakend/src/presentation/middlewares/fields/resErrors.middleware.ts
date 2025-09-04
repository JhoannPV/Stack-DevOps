import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";



export class ResErrorsMiddleware {
    static resErrors = (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.mapped() });

        next();
    }
}