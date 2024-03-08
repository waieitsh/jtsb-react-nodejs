'use strict';

import { Sequelize } from 'sequelize';
const env = process.env.NODE_ENV || 'development';
import { config } from '../config/config.js';
import SiteUser from './siteUser.js';
import Question from './question.js';
import Answer from './answer.js';

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
    [key: string]: (typeof SiteUser | typeof Question | typeof Answer) & {
        associate: (models: Database) => void;
    };
}

const database = {} as Database;

import('./siteUser.js').then(function (value) {
    database[value.default.name] = value.default;
});

import('./question.js').then(function (value) {
    database[value.default.name] = value.default;
});

import('./answer.js').then(function (value) {
    database[value.default.name] = value.default;
});

Object.keys(database).forEach(function (modelName) {
    database[modelName].associate(database);
});

export { sequelize };
