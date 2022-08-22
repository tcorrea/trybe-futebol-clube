import { Router } from 'express';
import { TeamControllerShow, TeamControllerIndex } from '../controllers/team/TeamFacade';

const router = Router();

router.get('/', (req, res) => TeamControllerIndex.index(req, res));
router.get('/:id', (req, res) => TeamControllerShow.show(req, res));

export default router;
