import { Router } from 'express';
import MatchController from '../controllers/MatchController';
const router = Router();

router.get('/', (req, res) => MatchController.index(req, res));
router.get('/:inProgress', (req, res) => MatchController.show(req, res));
router.post('/', (req, res) => MatchController.store(req, res));


export default router;
