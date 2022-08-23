import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import Token from '../middlewares/TokenMiddleware';

const router = Router();

router.get('/', (req, res) => MatchController.index(req, res));
router.get('/:inProgress', (req, res) => MatchController.show(req, res));
router.post('/', Token.validate, (req, res) => MatchController.store(req, res));
router.patch('/:id/finish', Token.validate, (req, res) => MatchController.updateFinished(req, res));

export default router;
