import Joi from 'joi';
import errorMessages from './errorMessages.json';

export const signupSchema = Joi.object({
    firstName: Joi.string().required().messages(errorMessages.firstName),
    lastName: Joi.string().required().messages(errorMessages.lastName),
    email: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@citiustech\.com$/).required().messages(errorMessages.email),
    password: Joi.string().min(6).required().messages(errorMessages.password),
    phoneNumber: Joi.string()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@citiustech\.com$/).required().messages(errorMessages.email),
    password: Joi.string().min(6).required().messages(errorMessages.password)
});