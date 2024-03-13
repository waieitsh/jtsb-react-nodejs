'use strict';

import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

interface Config {
    [key: string]: {
        username: string;
        password: string | undefined;
        database: string;
        host: string | undefined;
        port: number | undefined;
        dialect: Dialect | undefined;
    };
}

const config: Config = {
    development: {
        username: process.env.DATABASE_USERNAME as string,
        password: process.env.DATABASE_PASSWORD as string,
        database: process.env.DATABASE_NAME as string,
        host: process.env.DATABASE_HOST as string,
        port: Number(process.env.DATABASE_PORT),
        dialect: 'postgres' as Dialect,
    },
    test: {
        username: process.env.DATABASE_USERNAME as string,
        password: process.env.DATABASE_PASSWORD as string,
        database: process.env.DATABASE_NAME as string,
        host: process.env.DATABASE_HOST as string,
        port: Number(process.env.DATABASE_PORT),
        dialect: 'postgres' as Dialect,
    },
};

export { config };
