'use strict';

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'node:url';
import { Sequelize } from 'sequelize';
import { config } from '../config/config.js';
const basename = path.basename(path.resolve('dist/models/index.js'));
const __dirname = path.resolve('dist/models');
const env = process.env.NODE_ENV || 'development';

const _config = config(env);

interface IDatabase {
    [key: string]: any;
}

interface IModels {
    [key: string]: any;
}

const database = {} as IDatabase;

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

const resolver = new Promise(function (resolve) {
    fs.readdirSync(__dirname)
        .filter(function (file) {
            return (
                file.indexOf('.') !== 0 &&
                file !== basename &&
                file.slice(-3) === '.js'
            );
        })
        .forEach(function (file) {
            const url = pathToFileURL(path.join(__dirname, file)).toString();
            const modelName = file.split('.')[0];
            import(url).then(function (models) {
                const model = models[modelName](database.sequelize);
                database[model.name] = model;
            });
            resolve(database);
        });
});

resolver.then(function () {
    Object.keys(database).forEach(function (modelName) {
        if (database[modelName].associate) {
            database[modelName].associate(database);
        }
    });
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

export { database, sequelize };
export type { IDatabase, IModels };
