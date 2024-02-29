'use strict';

import { IModels } from './index';
const { Sequelize, DataTypes } = require('sequelize');

const question = function (sequelize: typeof Sequelize) {
    const question = sequelize.define('question', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        subject: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
        answerList: {
            type: DataTypes.STRING,
        },
    });

    /* question.associate = function (models: IModels) {
        question.hasOne(models.site_user, { foreignKey: 'id' });
    }; */

    question
        .sync({ force: true })
        .then(function () {})
        .catch(function () {});

    return question;
};

export { question };
