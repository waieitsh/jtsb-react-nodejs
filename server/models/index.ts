'use strict';

import path from 'path';
import { Sequelize } from 'sequelize';
const env = process.env.NODE_ENV || 'development';
import { config } from '../config/config';

const _config = config[env];

const sequelize = new Sequelize(
    _config.database,
    _config.username,
    _config.password,
    {
        host: _config.host,
        dialect: _config.dialect,
        port: _config.port,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
);

interface Database {
    [key: string]: { associate: (models: Database) => void };
}

const database = {} as Database;

const siteUser = require(path.join(__dirname, 'siteUser.js'));
database[siteUser.name] = siteUser;
const question = require(path.join(__dirname, 'question.js'));
database[question.name] = question;
const answer = require(path.join(__dirname, 'answer.js'));
database[answer.name] = answer;

Object.keys(database).forEach(function (modelName) {
    database[modelName].associate(database);
});

export { sequelize, database };
