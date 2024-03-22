'use strict';

import signup from './signup.js';
import questionList from './questionList.js';

const userController = {
    signup: signup,
};

const questionController = {
    questionList: questionList,
};

export { userController, questionController };
