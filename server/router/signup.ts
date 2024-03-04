'use strict';

import express from 'express';
import { userController } from '../controller/index.js';

const router = express.Router();

router.post('/signup', userController.signup);

export default router;
