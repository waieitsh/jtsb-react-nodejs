'use strict';

import express from 'express';
import { userController, questionController } from '../controller/index.js';

const router = express.Router();

router.get('/list', questionController.questionList);

router.post('/signup', userController.signup);

export default router;
