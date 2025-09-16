import { Router, Request, Response, NextFunction } from 'express';
import { PaymentController as controller} from './payment.controller.js';

const router = Router();


router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.sanitizePaymentInput, controller.add);
router.put('/:id', controller.sanitizePaymentInput, controller.update);
router.delete('/:id', controller.remove);

export { router };