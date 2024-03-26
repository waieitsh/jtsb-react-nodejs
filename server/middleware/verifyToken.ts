import { readFileSync } from 'node:fs';
import jwt, { Jwt, JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import path from 'node:path';

function verifyToken(request: Request, response: Response, next: NextFunction) {
    const publicKey = readFileSync(path.resolve() + '/public.pem');
    const { token } = request.body;

    if (token) {
        jwt.verify(
            token,
            publicKey,
            function (error: VerifyErrors | null, decoded: Jwt | JwtPayload | string | undefined) {
                if (error?.message === 'jwt expired') {
                    return response.status(400).json({ message: error?.message });
                }

                response.locals.username = (decoded as JwtPayload).aud
            },
        );

        next();
    }
}

export default verifyToken;
