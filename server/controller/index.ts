'use strict';

import { signup, login } from './userController.js';
import { list } from './questionController.js';

const userController = {
    signup: signup,
    login: login,
};

const questionController = {
    list: list,
};

export { userController, questionController };
