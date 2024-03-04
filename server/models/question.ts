'use strict';

import { IDatabase, IModels } from './index.js';
import { BuildOptions, DataTypes, Model } from 'sequelize';

interface questionInstance extends Model {
    id: number;
    subject: string;
    author: string;
}

type questionStatic = typeof Model & {
    associate: (models: IModels) => void;
} & {
    new (values?: object, options?: BuildOptions): questionInstance;
};

const question = function (sequelize: IDatabase) {
    const question = <questionStatic>sequelize.define('question', {
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
            type: DataTypes.TEXT,
        },
        author: {
            type: DataTypes.STRING,
        },
    });

    question.associate = function (models: IModels) {
        // question.belongsTo(models.site_user, { foreignKey: 'id', as: 'user_id' });
        // question.hasMany(models.answer, { foreignKey: 'id', as: 'answer_id' });
    };

    question
        .sync({ force: true })
        .then(function (response: any) {
            console.log(`question then = ${response}`);
        })
        .catch(function (error: Error) {
            console.log(`question error = ${error}`);
        });

    return question;
};

export { question };
