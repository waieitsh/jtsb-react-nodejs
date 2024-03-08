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

class Question extends Model<
    InferAttributes<Question>,
    InferCreationAttributes<Question>
> {
    declare id: number | null;
    declare subject: string;
    declare content: string;
    declare author_id: number;

    static associate(models: Models) {
        Question.belongsTo(models.site_user, {
            foreignKey: 'author_id',
        });

        Question.hasMany(models.answer, {
            foreignKey: 'question_id',
        });
    }
}

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
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
        author_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: 'question',
        schema: 'public',
        underscored: true,
    },
);

(async function () {
    await Question.sync({ force: true });
})();

export { Question };
