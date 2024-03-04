'use strict';

import { IDatabase, IModels } from './index.js';
import { BuildOptions, DataTypes, Model } from 'sequelize';

interface answerInstance extends Model {
    id: number;
    content: string;
    author: string;
    user_id: number;
}

type answerStatic = typeof Model & { associate: (models: IModels) => void } & {
    new (values?: object, options?: BuildOptions): answerInstance;
};

const answer = function (sequelize: IDatabase) {
    const answer = <answerStatic>sequelize.define('answer', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
        },
        author: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'site_user',
                key: 'id',
            },
        },
    });

    answer.associate = function (models: IModels) {
        // answer.belongsTo(models.site_user, { foreignKey: 'user_id' });
        // answer.belongsTo(models.question, { foreignKey: 'id', as: 'question_id' });
    };

    answer
        .sync({ force: true })
        .then(function (response: any) {
            console.log(`answer then = ${response}`);
        })
        .catch(function (error: Error) {
            console.log(`answer error = ${error}`);
        });

    return answer;
};

export { answer };
