'use strict';

import express from 'express';
import { controller } from '../controller/index.js';

const router = express.Router();

router.post('/signup', controller.signup);

export default router;
