'use strict';

import path from 'path';
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(
        __dirname + '/../../.env',
        `.${process.env.NODE_ENV}.env`,
    ),
});

const config = {
    database_username: process.env.DATABASE_USERNAME,
    database_password: process.env.DATABASE_PASSWORD,
    database_name: process.env.DATABASE_NAME,
    database_host: process.env.DATABASE_HOST,
    database_port: process.env.DATABASE_PORT,
    dialect: 'postgres',
};

export default config;
