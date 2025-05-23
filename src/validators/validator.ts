import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(400).json({
                message: 'Validation error',
                errors: error.details.map(detail => ({
                    field: detail.context?.key,
                    message: detail.message
                }))
            });
            return;
        }

        next();
    };
};
