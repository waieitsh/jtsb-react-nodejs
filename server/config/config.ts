'use strict';

import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

interface IReturnTypes {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: Dialect;
}

interface IConfig {
    [key: string]: IReturnTypes;
    development: IReturnTypes;
}

const _config: IConfig = {
    development: {
        username: process.env.DATABASE_USERNAME as string,
        password: process.env.DATABASE_PASSWORD as string,
        database: process.env.DATABASE_NAME as string,
        host: process.env.DATABASE_HOST as string,
        port: Number(process.env.DATABASE_PORT),
        dialect: 'postgres',
    },
};

function config(env: keyof IConfig): IReturnTypes {
    return _config[env];
}

export { config };
