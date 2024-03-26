'use strict';

import express from 'express';
import { userController, questionController, tokenController } from '../controller/index.js';
import {
    checkLoginEntryEmpty,
    checkQuestionCreateEntryEmpty,
    checkSingupEntryEmpty,
} from '../middleware/checkEntryEmpty.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/list', questionController.list);
router.post('/create', checkQuestionCreateEntryEmpty, verifyToken, questionController.create);

router.post('/login', checkLoginEntryEmpty, userController.login);
router.post('/signup', checkSingupEntryEmpty, userController.signup);

router.post('/verifyToken', verifyToken, tokenController.processToken);

export default router;
