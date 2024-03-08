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
    [key: string]: ModelStatic<
        Model<InferAttributes<SiteUser>, InferCreationAttributes<SiteUser>>
    >;
}

class SiteUser extends Model<
    InferAttributes<SiteUser>,
    InferCreationAttributes<SiteUser>
> {
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

SiteUser.sync({ force: true })
    .then(function (response: Model<any, any> | PromiseLike<void>) {
        console.log(`siteUser then = ${response}`);
    })
    .catch(function (error: Error) {
        console.log(`siteUser error = ${error}`);
    });

module.exports = SiteUser;
