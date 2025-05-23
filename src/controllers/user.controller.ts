import { Request, Response } from 'express';
import { profileService, updateProfileImage } from '../services/user.service';

import s3 from '../utils/s3handler';
import { v4 as uuidv4 } from 'uuid';

export const profile = async (req: Request, res: Response) => {

    try {
        var respData: any = await profileService(req.userId);
        respData.password = undefined;
        res.status(200).json({ data: respData });
    } catch (e) {
        res.status(400).json({ status: 500, message: e })
    }

};

export const fileUploadController = async (req: Request, res: Response) => {

    if (!req.file) res.status(400).json({ error: 'No file uploaded' });

    const file = req.file;

    const uploadParams = {
        Bucket: process.env.S3_BUCKET!,
        Key: `${uuidv4()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    try {
        const result = await s3.upload(uploadParams).promise();

        var respData: any = await updateProfileImage(req.userId, result.Location);

        respData.password = undefined;
        res.status(200).json({ data: respData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Upload failed' });
    }
}