import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';


export const generateAccessToken = (userId: string): string => {
    return jwt.sign({ id: userId }, ACCESS_SECRET, {
        expiresIn: '15 mins',
    });
};

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign({ id: userId }, REFRESH_SECRET, {
        expiresIn: '7 days',
    });
};

export const verifyRefreshToken = (token: string): any => {
    return jwt.verify(token, REFRESH_SECRET);
};

export const verifyAccessToken = (token: string): any => {
    return jwt.verify(token, ACCESS_SECRET);
};
