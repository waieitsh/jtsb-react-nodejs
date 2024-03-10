'use strict';

import express from 'express';
import router from './router/signup.js';
import { sequelize } from './models/index.js';
import cors from 'cors';

const app = express();
const port: number = 5000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

sequelize
    .authenticate()
    .then(function () {
        console.log('Connection has been established successfully.');
    })
    .catch(function (error) {
        console.error('Unable to connect to the database:', error);
    });

app.use('/user', router);

app.listen(port, function () {
    console.log(`The server is running on http://localhost:${port}`);
});
