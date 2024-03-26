'use strict';

import { Request, Response } from 'express';

function processToken(request: Request, response: Response) {
    return response.status(200).json({ username: response.locals.username });
}

export { processToken };
