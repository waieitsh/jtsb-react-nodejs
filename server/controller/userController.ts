'use strict';

import { Request, Response } from 'express';
import { SiteUser } from '../models/siteUser.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'node:fs';
import path from 'node:path';

async function signup(request: Request, response: Response) {
    const { username, password1, password2, email } = request.body;
    const saltRounds = 10;

    const siteUser = await SiteUser.findOne({ where: { username: username } });
    const _email = await SiteUser.findOne({ where: { email: email } });

    if (siteUser !== null) {
        return response.status(409).json({ message: '사용자ID가 이미 사용 중입니다' });
    } else if (password1 !== password2) {
        return response.status(409).json({ message: '패스워드가 일치하지 않습니다' });
    } else if (_email !== null) {
        return response.status(409).json({ message: '이메일이 이미 사용 중입니다' });
    } else {
        bcrypt.hash(password1, saltRounds, async function (error, hash) {
            await SiteUser.create({
                username: username,
                password: hash,
                email: email,
            });
        });

        return response.status(200).json({ message: 'SIGNUP_SUCCEEDED' });
    }
}

async function login(request: Request, response: Response) {
    const privateKey = readFileSync(path.resolve() + '/private.pem');

    const { username, password } = request.body;

    const siteUser = await SiteUser.findOne({ where: { username: username } });

    const _password = await bcrypt.compare(password, siteUser?.password as string);

    if (_password) {
        jwt.sign(
            { iss: 'localhost', aud: username },
            privateKey,
            { algorithm: 'RS256', expiresIn: '1h' },
            function (error, token) {
                return response.status(200).json({ message: 'LOGIN_SUCCEEDED', token: token });
            },
        );
    }
}

export { signup, login };
