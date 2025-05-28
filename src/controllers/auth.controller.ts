import { Request, Response } from 'express';
import { signupService, loginService, refreshTokenCheckUser } from '../services/auth.service'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';

export const signup = async (req: Request, res: Response) => {

    try {
        var respData: any = await signupService(req.body);
        respData.password = undefined;
        res.status(200).json({ message: 'Sign Up successful', data: respData });
    } catch (e) {
        res.status(400).json({ status: 500, message: e })
    }

};


export const login = async (req: Request, res: Response) => {

    try {

        var respData: any = await loginService(req.body);
        respData.password = undefined;

        const accessToken = generateAccessToken(respData._id.toString());
        const refreshToken = generateRefreshToken(respData._id.toString());

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Login successful', token: accessToken, user: respData });

    } catch (e) {

        res.status(400).json({ status: 500, message: e })
    }

};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.refreshToken;

    if (!token) {
        res.status(401).json({ message: 'Refresh token is required' });
        return;
    }

    try {
        const payload = verifyRefreshToken(token);

        var respData: any = await refreshTokenCheckUser(payload);

        const accessToken = generateAccessToken(respData._id.toString());

        res.status(200).json({ accessToken });

    } catch (err) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};