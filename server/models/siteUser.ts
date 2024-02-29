'use strict';

import { IModels } from './index';
const { Sequelize, DataTypes } = require('sequelize');

const siteUser = function (sequelize: typeof Sequelize) {
    const siteUser = sequelize.define('site_user', {
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
        },
    });

    /* siteUser.associate = function (models: IModels) {
        siteUser.hasOne(models.site_user, { foreignKey: 'id' });
    }; */

    siteUser
        .sync({ force: true })
        .then(function () {})
        .catch(function () {});

    return siteUser;
};

export { siteUser };
