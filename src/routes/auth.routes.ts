import { Router } from 'express';
import { signup, login, refreshToken } from '../controllers/auth.controller';
import { validate } from '../validators/validator';
import { signupSchema, loginSchema } from '../validators/schemas';

const router = Router();


router.post('/sign-up', validate(signupSchema), signup);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: abhi@citiustech.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */


router.post('/login', validate(loginSchema), login);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: abhi@citiustech.com
 *               password:
 *                 type: string
 *                 example: 123456 
 *     responses:
 *       200:
 *         description: Returns Access Token and User Data
 *       400:
 *         description: Invalid credentials
 */



router.post('/refresh-token', refreshToken);
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh the access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns new access token
 *       401:
 *         description: Invalid refresh token
 */


export default router;