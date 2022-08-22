import { Router } from 'express';
// import { MatchControllerIndex } from '../controllers/match/MatchFacade';
import MatchControllerIndex from '../controllers/match/MatchControllerIndex';

const router = Router();

router.get('/', (req, res) => MatchControllerIndex.index(req, res));

export default router;
