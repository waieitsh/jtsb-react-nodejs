'use strict';

import { signup, login } from './userController.js';
import { create, list } from './questionController.js';
import { processToken } from './tokenController.js';

const userController = {
    signup: signup,
    login: login,
};

const questionController = {
    list: list,
    create: create,
};

const tokenController = {
    processToken: processToken,
};

export { userController, questionController, tokenController };
