'use strict';

import { Request, Response } from 'express';
import { SiteUser } from '../models/siteUser.js';
import bcrypt from 'bcrypt';

function signup(request: Request, response: Response) {
    const { username, password1, email } = request.body;
    const saltRounds = 10;

    bcrypt.hash(password1, saltRounds, async function (error, hash) {
        await SiteUser.create({
            username: username,
            password: hash,
            email: email,
        });
    });

    return response.json({ message: 'signup succeeded' });
}

export default signup;
