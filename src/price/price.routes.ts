import { Router } from 'express';
import { PriceController as controller } from './price.controller.js';

export const priceRouter = Router();
priceRouter.get('/', controller.findAll);
priceRouter.get('/:id', controller.findOne);
priceRouter.post('/', controller.sanitizePriceInput, controller.add);
priceRouter.put('/:id', controller.sanitizePriceInput, controller.update);
priceRouter.patch('/:id', controller.sanitizePriceInput, controller.update);
priceRouter.delete('/:id', controller.remove);