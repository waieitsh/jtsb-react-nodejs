'use strict';

import { Request, Response } from 'express';
import { NextFunction } from 'express';

function checkSingupEntryEmpty(request: Request, response: Response, next: NextFunction) {
    const { username, password1, password2, email } = request.body;

    if (username === '') {
        return response.status(400).json({ message: '사용자ID는 필수 항목입니다' });
    } else if (password1 === '') {
        return response.status(400).json({ message: '비밀번호는 필수 항목입니다' });
    } else if (password2 === '') {
        return response.status(400).json({ message: '비밀번호 확인은 필수 항목입니다' });
    } else if (email === '') {
        return response.status(400).json({ message: '이메일은 필수 항목입니다' });
    } else {
        next();
    }
}

function checkLoginEntryEmpty(request: Request, response: Response, next: NextFunction) {
    const { username, password } = request.body;

    if (username === '') {
        return response.status(400).json({ message: '사용자ID를 입력해 주세요' });
    } else if (password === '') {
        return response.status(400).json({ message: '비밀번호를 입력해 주세요' });
    } else {
        next();
    }
}

function checkQuestionCreateEntryEmpty(request: Request, response: Response, next: NextFunction) {
    const { subject, content } = request.body;

    if (subject === '') {
        return response.status(400).json({ message: '제목을 입력해 주세요' });
    } else if (content === '') {
        return response.status(400).json({ message: '내용을 입력해 주세요' });
    } else {
        next();
    }
}

export { checkSingupEntryEmpty, checkLoginEntryEmpty, checkQuestionCreateEntryEmpty };
