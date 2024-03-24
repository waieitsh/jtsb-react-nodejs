'use strict';

import express from 'express';
import { userController, questionController } from '../controller/index.js';
import { checkLoginEntryEmtpry, checkSingupEntryEmpty } from '../middleware/checkEntryEmpty.js';

const router = express.Router();

router.get('/list', questionController.list);

router.post('/login', checkLoginEntryEmtpry, userController.login);
router.post('/signup', checkSingupEntryEmpty, userController.signup);

export default router;
