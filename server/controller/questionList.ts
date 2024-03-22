'use strict';

import { Request, Response } from 'express';
import { Question } from '../models/question.js';
import { Op } from 'sequelize';
import { SiteUser } from '../models/siteUser.js';
import { Answer } from '../models/answer.js';

async function questionList(request: Request, response: Response) {
    const { page } = request.query;
    const count = await Question.count();
    const limit: number = 10;

    const question = await Question.findAll({
        where: {
            id: {
                [Op.lte]: count - Number(page) * limit,
            },
        },
        order: [['id', 'DESC']],
        limit: limit,
        include: [
            {
                model: SiteUser,
                attributes: ['username'],
            },
            {
                model: Answer,
                attributes: ['content', 'question_id'],
            },
        ],
    });

    return response.json({ data: question, count: count });
}

export default questionList;
