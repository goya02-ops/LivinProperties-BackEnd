import { Router } from 'express';
import { DocumentationController as controller } from './documentation.controller.js';

export const documentationRouter = Router();
documentationRouter.get('/', controller.findAll);
documentationRouter.get('/:id', controller.findOne);
documentationRouter.post('/', controller.sanitizeDocumentationInput, controller.add);
documentationRouter.put('/:id', controller.sanitizeDocumentationInput, controller.update);
documentationRouter.patch('/:id', controller.sanitizeDocumentationInput, controller.update);
documentationRouter.delete('/:id', controller.remove);