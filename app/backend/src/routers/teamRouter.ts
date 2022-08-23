import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

router.get('/', (req, res) => TeamController.index(req, res));
router.get('/:id', (req, res) => TeamController.show(req, res));

export default router;
