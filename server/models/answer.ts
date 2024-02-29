'use strict';

import { IModels } from './index';
const { Sequelize, DataTypes } = require('sequelize');

const answer = function (sequelize: typeof Sequelize) {
    const answer = sequelize.define('answer', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
        },
        question: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
    });

    /* answer.associate = function (models: IModels) {
        answer.hasOne(models.site_user, { foreignKey: 'id' });
    }; */

    answer
        .sync({ force: true })
        .then(function () {})
        .catch(function () {});

    return answer;
};

export { answer };
