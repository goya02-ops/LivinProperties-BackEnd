import { StateController as controller } from './state.controller.js';
import { Router } from 'express';

export const stateRouter = Router();
stateRouter.get('/', controller.findAll);
stateRouter.get('/:id', controller.findOne);
stateRouter.post('/', controller.sanitizeStateInput, controller.add);
stateRouter.put('/:id', controller.sanitizeStateInput, controller.update);
stateRouter.patch('/:id', controller.sanitizeStateInput, controller.update);
stateRouter.delete('/:id', controller.remove);