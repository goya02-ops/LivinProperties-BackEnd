import { Router, Request, Response, NextFunction } from 'express';
import { NeighborhoodController as controller} from './neighborhood.controller.js';

const router = Router();

// Middleware para sanitizar la entrada de Neighborhood
function sanitizeNeighborhoodInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizeInput = {
        name: req.body.name,
        postalCode: req.body.postalCode,
    };

    Object.keys(req.body.sanitizeInput).forEach(key => {
        if (req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key];
    });

    next();
}

/*router.get('/', controller.findAll);*/
router.get('/:name/:postalCode', controller.findOne);
router.post('/', sanitizeNeighborhoodInput, controller.add);
router.put('/:name/:postalCode', sanitizeNeighborhoodInput, controller.update);
router.delete('/:name/:postalCode', controller.remove);

export { router };