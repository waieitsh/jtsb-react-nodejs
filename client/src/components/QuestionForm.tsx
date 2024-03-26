import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BindingResult } from '../types';

function QuestionForm() {
    const [subject, setSubject] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [bindingResult, setBindingResult] = useState<BindingResult>({} as BindingResult);
    const navigate = useNavigate();

    function createQuestion() {
        axios
            .post(`http://localhost:5000/question/create`, {
                subject: subject,
                content: content,
                token: localStorage.getItem('token'),
            })
            .then(function (response) {
                navigate('/');
            })
            .catch(function (error) {
                setBindingResult(error.response.data);
            });
    }

    return (
        <div className="container">
            <h5 className="my-3 border-bottom pb-2">질문등록</h5>
            <div className={bindingResult.message !== undefined ? 'alert alert-danger' : undefined}>
                {bindingResult.message}
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
                    onChange={(e) => setSubject(e.target.value)}
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
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <input type="submit" value="저장하기" className="btn btn-primary my-2" onClick={createQuestion} />
        </div>
    );
}

export default QuestionForm;
