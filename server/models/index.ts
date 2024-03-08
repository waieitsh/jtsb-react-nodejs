'use strict';

import { Sequelize } from 'sequelize';
import { config } from '../config/config.js';
import { SiteUser } from './siteUser.js';
import { Question } from './question.js';
import { Answer } from './answer.js';
const env = process.env.NODE_ENV || 'development';

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

(async function () {
    const siteUser = await import('./siteUser.js');
    const question = await import('./question.js');
    const answer = await import('./answer.js');

    database[siteUser.SiteUser.name] = siteUser.SiteUser;
    database[question.Question.name] = question.Question;
    database[answer.Answer.name] = answer.Answer;

    Object.keys(database).forEach(function (modelName) {
        database[modelName].associate(database);
    });
})();

export { sequelize };
