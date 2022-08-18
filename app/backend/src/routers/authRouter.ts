import { Router } from 'express';
import controller from '../controllers/Auth';

const router = Router();

router.post('/', (req, res) => controller.authenticate(req, res));

export default router;
