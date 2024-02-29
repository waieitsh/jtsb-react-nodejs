import { Dispatch, SetStateAction } from 'react';

interface IQuestion {
    first: IFirst[];
    second: [
        {
            totalElements: number;
            number: number;
            size: number;
            isEmpty: boolean;
            hasPrevious: boolean;
            hasNext: boolean;
            totalPages: number;
        },
    ];
    third: IAnswerListDetails[];
}

interface IFirst {
    id: number;
    subject: string;
    content: string;
    createDate: string;
}

interface IQuestionDetails {
    first: IFirst[];
    second: IAnswer[];
}

interface IAnswer {
    id: number;
    content: string;
    question?: IQuestion[];
    createDate: string;
}

interface IBindingResult {
    SUBJECT_REQUIRED: string;
    CONTENT_REQUIRED: string;
    PASSWORD_NOT_MATCH: string;
    USER_EXISTS: string;
    USER_NOT_EXISTS: string;
    DATA_NOT_EXISTS: string;
    USERID_REQUIRED: string;
    PASSWORD_REQUIRED: string;
    PASSWORD_CONFIRM_REQUIRED: string;
    EMAIL_REQUIRED: string;
    EMAIL_FORM_VIOLATION: string;
    USERID_RANGE_VIOLATION: string;
}

interface IAnswerListDetails {
    id: number;
    size: number;
}

export type {
    IQuestion,
    IQuestionDetails,
    IAnswer,
    IBindingResult,
    IFirst,
    IAnswerListDetails,
};
