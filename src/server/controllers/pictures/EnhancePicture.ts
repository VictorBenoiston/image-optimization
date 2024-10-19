import { Request } from 'express';
import { IPictureQuery } from '../../models/PictureQuery'
import { validation } from '../../shared/middlewares/Validation'
import * as yup from 'yup';

interface IQueryProps {
    q?: number,
    fm?: string,
    w?: number,
    h?: number,
    gray?: number
}

export const enhancementValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        q: yup.number().integer().optional(),
        fm: yup.string().optional(),
        w: yup.number().integer().optional(),
        h: yup.number().integer().optional(),
        gray: yup.number().integer().optional()
    }))
}))

export const enhancePicture = async (req: Request<IQueryProps>, res:Response) => {
    
}