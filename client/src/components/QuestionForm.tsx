import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBindingResult } from '../types';

function QuestionForm() {
    const [subject, setSubject] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [bindingResult, setBindingResult] = useState<IBindingResult>(
        {} as IBindingResult,
    );
    const navigate = useNavigate();

    function createQuestion() {
        axios
            .post(
                `https://localhost:8080/question/create`,
                {
                    subject: subject,
                    content: content,
                },
                { withCredentials: true },
            )
            .then(function (response) {
                navigate('/');
            })
            .catch(function (error) {
                console.log(`error >> ${JSON.stringify(error.response)}`);
                setBindingResult(error.response.data.message);
            });
    }

    useEffect(function () {
        console.log(`bindingResult >>>>>>>>>>>. ${bindingResult}`);
    }, []);

    return (
        <div className="container">
            <h5 className="my-3 border-bottom pb-2">질문등록</h5>
            <div
                className={
                    bindingResult.SUBJECT_REQUIRED !== null &&
                    bindingResult.SUBJECT_REQUIRED !== undefined
                        ? 'alert alert-danger'
                        : undefined
                }
            >
                {bindingResult.SUBJECT_REQUIRED}
            </div>
            <div
                className={
                    bindingResult.CONTENT_REQUIRED !== null &&
                    bindingResult.CONTENT_REQUIRED !== undefined
                        ? 'alert alert-danger'
                        : undefined
                }
            >
                {bindingResult.CONTENT_REQUIRED}
            </div>

            <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                    제목
                </label>
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="form-control"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSubject(e.target.value)
                    }
                />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">
                    내용
                </label>
                <textarea
                    name="content"
                    id="content"
                    className="form-control"
                    rows={10}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setContent(e.target.value)
                    }
                />
            </div>
            <input
                type="submit"
                value="저장하기"
                className="btn btn-primary my-2"
                onClick={createQuestion}
            />
        </div>
    );
}

export default QuestionForm;
