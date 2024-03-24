interface Question {
    data: [
        {
            id: number;
            subject: string;
            content: string;
            author_id: number;
            createdAt: string;
            updatedAt: string;
            site_user: {
                username: string;
            };
            answers: [
                {
                    content: string;
                    question_id: number;
                },
            ];
        },
    ];
    count: number;
}

interface First {
    id: number;
    subject: string;
    content: string;
    createDate: string;
}

interface QuestionDetails {
    first: First[];
    second: Answer[];
}

interface Answer {
    id: number;
    content: string;
    question?: Question[];
    createDate: string;
}

interface BindingResult {
    message: string;
}

interface AnswerListDetails {
    id: number;
    size: number;
}

export type { Question, QuestionDetails, Answer, BindingResult, First, AnswerListDetails };
