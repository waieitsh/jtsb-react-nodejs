'use strict';

import express from 'express';
import { userController } from '../controller/index';

const router = express.Router();

router.post('/signup', userController.signup);

export default router;
