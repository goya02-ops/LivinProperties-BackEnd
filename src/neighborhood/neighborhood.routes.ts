import { Router, Request, Response, NextFunction } from 'express';
import { NeighborhoodController as controller} from './neighborhood.controller.js';

const router = Router();


router.get('/', controller.findAll);
router.get('/:name/:postalCode', controller.findOne);
router.post('/', controller.sanitizeNeighborhoodInput, controller.add);
router.put('/:name/:postalCode', controller.sanitizeNeighborhoodInput, controller.update);
router.delete('/:name/:postalCode', controller.remove);

export { router };