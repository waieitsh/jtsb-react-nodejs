'use strict';

import { sequelize } from './index.js';
import { DataTypes, InferAttributes, InferCreationAttributes, Model, ModelStatic } from 'sequelize';

interface Models {
    [key: string]: ModelStatic<Model<any, any>>;
}

class SiteUser extends Model<InferAttributes<SiteUser>, InferCreationAttributes<SiteUser>> {
    declare id: number | null;
    declare username: string;
    declare password: string;
    declare email: string;

    static associate(models: Models) {
        SiteUser.hasMany(models.question, {
            foreignKey: 'author_id',
        });

        SiteUser.hasMany(models.answer, {
            foreignKey: 'author_id',
        });
    }
}

SiteUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
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
    },
    {
        sequelize,
        modelName: 'site_user',
        schema: 'public',
        underscored: true,
    },
);

(async function () {
    await SiteUser.sync({ force: false });
})();

export { SiteUser };
