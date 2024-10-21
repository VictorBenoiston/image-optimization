import { Request, Response, Router } from 'express';
import { EnhancePictureController } from '../controllers/pictures';

const router = Router();


router.get('/', (req: Request, res: Response): any => {
    return res.status(200).send('Challenge');
});

router.get('/images/:image_path', EnhancePictureController.enhancementValidation, EnhancePictureController.enhancePicture);

export { router };
