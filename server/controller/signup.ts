'use strict';

import { Request, Response } from 'express';

function signup(req: Request, res: Response) {
    return res.json({ status: true });
}

export default signup;
