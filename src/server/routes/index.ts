import { Request, Response, Router } from 'express';

const router = Router();


router.get('/', (req: Request, res: Response): any => {
    return res.status(201).send('Challenge');
});

export { router };
