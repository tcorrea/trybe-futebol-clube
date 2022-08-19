import { Router } from 'express';
import controller from '../controllers/Auth';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', AuthMiddleware.validate, (req, res) => controller.authenticate(req, res));
router.get('/validate', (req, res) => controller.validate(req, res));

export default router;
