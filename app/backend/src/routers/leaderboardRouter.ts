import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

router.get('/home', (req, res) => LeaderboardController.home(req, res));

export default router;
