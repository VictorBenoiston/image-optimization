import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares/Validation';
import * as yup from 'yup';
import { getImageFromS3 } from '../../shared/services/S3Service';
import { resizeImage } from '../../shared/services/ImageService';
import path from 'path';
import { generateCacheKey } from '../../shared/services/RedisService';
import Redis from 'ioredis';
import { redisClient } from '../../Server';

// const redis = new Redis();

interface IQueryProps {
    q?: number,
    fm?: 'png' | 'jpg' | 'webp',
    w?: number,
    h?: number,
    gray?: number
}

export const enhancementValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        q: yup.number().integer().optional().max(100),
        fm: yup.string().oneOf(['png', 'jpg', 'webp']).optional(),
        w: yup.number().integer().optional(),
        h: yup.number().integer().optional(),
        gray: yup.number().integer().optional()
    }))
}))


export const enhancePicture = async (req: Request<IQueryProps>, res: Response): Promise<any> => {
    const imagePath = req.path;
    const { q, fm, w, h, gray } = req.query;
    const cacheKey = generateCacheKey(imagePath, req.query)

    try {
        const cachedImage = await redisClient.getBuffer(cacheKey);
        if (cachedImage) {
            console.log('serving from cache');
            res.set('Content-Type', 'image/' + path.extname(imagePath).slice(1));
            return res.status(200).send(cachedImage)
        }

        let imageBuffer = await getImageFromS3(imagePath)


        if (w || h || fm || q || gray) {
            imageBuffer = await resizeImage(imageBuffer, {
                width: w ? parseInt(w as string) : undefined,
                height: h ? parseInt(h as string) : undefined,
                format: fm ? fm as string : 'png',
                quality: q ? parseInt(q as string) : 85,
                grayscale: gray == '1'
            })
        }

        res.set('Content-Type', 'image/' + path.extname(imagePath).slice(1));
        res.send(imageBuffer);

        await redisClient.set(cacheKey, imageBuffer, 'EX', 3600); // Cache for 1 hour

    } catch (error: any) {
        if (error.message === 'Image not found') {
            return res.status(404).json({
                errors: { default: 'Image not found' }
            });
        }
        return res.status(500).json({
            errors: { default: error }
        });
    }
}
