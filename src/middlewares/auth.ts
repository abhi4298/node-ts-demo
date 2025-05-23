import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = verifyAccessToken(token);
        req.userId = payload.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
