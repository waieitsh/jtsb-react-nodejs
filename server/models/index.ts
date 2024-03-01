'use strict';

import fs from 'fs';
import path from 'path';
import config from '../config/config';
import { pathToFileURL } from 'node:url';
const { Sequelize, Model } = require('sequelize');
const basename = path.basename(__filename);

interface IDatabase {
    [key: string]: typeof Model;
    sequelize: typeof Sequelize;
}

interface IModels {
    [key: string]: typeof Model;
}

const database = {} as IDatabase;

const sequelize = new Sequelize(
    config.database_name,
    config.database_username,
    config.database_password,
    {
        host: config.database_host,
        dialect: config.dialect,
        port: config.database_port,
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
                const model = models[modelName](sequelize);
                database[model.name] = model;
                resolve(database);
            });
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
export type { IModels };
