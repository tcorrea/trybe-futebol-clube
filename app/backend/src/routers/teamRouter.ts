import { Router } from 'express';
import controller from '../controllers/team/TeamControllerIndex';

const router = Router();

router.get('/', (req, res) => controller.index(req, res));

export default router;
