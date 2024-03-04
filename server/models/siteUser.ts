'use strict';

import { IDatabase, IModels } from './index.js';
import { BuildOptions, DataTypes, Model } from 'sequelize';

interface siteUserInstance extends Model {
    id: number;
    subject: string;
    author: string;
}

type siteUserStatic = typeof Model & {
    associate: (models: IModels) => void;
} & {
    new (values?: object, options?: BuildOptions): siteUserInstance;
};

const siteUser = function (sequelize: IDatabase) {
    const siteUser = <siteUserStatic>sequelize.define('site_user', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
    });

    siteUser.associate = function (models: IModels) {
        siteUser.hasMany(models.answer);
        // siteUser.hasMany(models.question, { foreignKey: 'id', as: 'question_id' });
    };

    siteUser
        .sync({ force: true })
        .then(function (response: any) {
            console.log(`siteUser then = ${response}`);
        })
        .catch(function (error: Error) {
            console.log(`siteUser error = ${error}`);
        });

    return siteUser;
};

export { siteUser };
