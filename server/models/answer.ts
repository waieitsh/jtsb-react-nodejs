'use strict';

import { sequelize } from './index.js';
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    ModelStatic,
} from 'sequelize';

interface Models {
    [key: string]: ModelStatic<Model<any, any>>;
}

class Answer extends Model<
    InferAttributes<Answer>,
    InferCreationAttributes<Answer>
> {
    declare id: number | null;
    declare content: string;
    declare author_id: number;
    declare question_id: number;

    static associate(models: Models) {
        Answer.belongsTo(models.question, {
            foreignKey: 'question_id',
        });

        Answer.belongsTo(models.site_user, {
            foreignKey: 'author_id',
        });
    }
}

Answer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
        },
        author_id: {
            type: DataTypes.INTEGER,
        },
        question_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: 'answer',
        schema: 'public',
        underscored: true,
    },
);

(async function () {
    await Answer.sync({ force: true });
})();

export { Answer };
