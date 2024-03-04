'use strict';

import express from 'express';
import router from './router/signup.js';
import { sequelize } from './models/index.js';

const app = express();
const port = 5000;

sequelize
    .authenticate()
    .then(function () {
        console.log('Connection has been established successfully.');
    })
    .catch(function (error: Error) {
        console.error('Unable to connect to the database:', error);
    });

app.use('/user', router);

app.listen(port, function () {
    console.log(`the server is running on http://localhost:${port}`);
});
