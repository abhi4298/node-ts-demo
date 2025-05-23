import { Router } from 'express';
import { profile, fileUploadController } from '../controllers/user.controller';

import upload from '../middlewares/multer';

const router = Router();


router.get('/profile', profile);
/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user's data
 *       401:
 *         description: Unauthorized – missing or invalid token
 */


router.put('/upload', upload.single('file'), fileUploadController);
/**
 * @swagger
 * /user/upload:
 *   put:
 *     summary: Upload a file to S3
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The URL of the uploaded file
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */

export default router;