import { readFileSync } from 'node:fs';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import path from 'node:path';

const publicKey = readFileSync(path.resolve() + '/public.pem');

function verifyToken(request: Request, response: Response, next: NextFunction) {
    const { token } = request.body;

    // jwt.verify(token, publicKey, function (error: VerifyErrors | null, decoded: Jwt | JwtPayload | string | undefined) {
    //     console.log(decoded);
    // });

    jwt.verify(token, publicKey, function (error: any, decoded: any) {
        console.log(decoded);
    });
}

export default verifyToken;
