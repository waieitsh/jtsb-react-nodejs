import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IAnswer, IQuestionDetails } from '../types';
import { IBindingResult } from '../types';

function QuestionDetails() {
    const { id } = useParams();
    const [content, setContent] = useState<string>('');
    const [bindingResult, setBindingResult] = useState<IBindingResult>(
        {} as IBindingResult,
    );
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [questionDetails, setQuestionDetails] = useState<IQuestionDetails>(
        {} as IQuestionDetails,
    );

    useEffect(
        function () {
            axios
                .get(`https://localhost:8080/question/details/${id}`)
                .then(function (response) {
                    setQuestionDetails(response.data);
                })
                .catch(function (error) {
                    console.log(`error >> ${JSON.stringify(error.response)}`);
                });
        },
        [id, submitted],
    );

    function submitAnswer() {
        axios
            .post(
                `https://localhost:8080/answer/create/${id}`,
                {
                    content: content,
                },
                { withCredentials: true },
            )
            .then(function (response) {
                setBindingResult(response.data);
                setContent('');
                setSubmitted(!submitted);
            })
            .catch(function (error) {
                console.log(`error >> ${JSON.stringify(error)}`);
            });
    }

    return (
        <div className="container my-3">
            {questionDetails.first !== undefined ? (
                <>
                    <h2 className="border-bottom py-2">
                        {questionDetails.first[0].subject}
                    </h2>
                    <div className="card my-3">
                        <div className="card-body">
                            <div
                                className="card-text"
                                style={{ whiteSpace: 'pre-line' }}
                            >
                                {questionDetails.first[0].content}
                            </div>
                            <div className="d-flex justify-content-end">
                                <div className="badge bg-light text-dark p-2 text-start">
                                    <div>
                                        {questionDetails.first[0].createDate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            <h5 className="border-bottom my-3 py-2">
                {questionDetails.second !== undefined
                    ? questionDetails.second.length
                    : 0}
                개의 답변이 있습니다
            </h5>
            {questionDetails.second !== undefined
                ? questionDetails.second.map((data: IAnswer, index: number) => (
                      <div className="card my-3" key={index}>
                          <div className="card-body">
                              <div
                                  className="card-text"
                                  style={{ whiteSpace: 'pre-line' }}
                              >
                                  {data.content}
                              </div>
                              <div className="d-flex justify-content-end">
                                  <div className="badge bg-light text-dark p-2 text-start">
                                      <div>{data.createDate}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))
                : null}
            <div className="my-3">
                <div
                    className={
                        bindingResult.SUBJECT_REQUIRED !== undefined
                            ? 'alert alert-danger'
                            : undefined
                    }
                >
                    {bindingResult.SUBJECT_REQUIRED}
                </div>
                <textarea
                    rows={10}
                    className="form-control"
                    value={content}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setContent(e.target.value)
                    }
                />
                <input
                    type="submit"
                    value="답변등록"
                    className="btn btn-primary my-2"
                    onClick={submitAnswer}
                />
            </div>
        </div>
    );
}

export default QuestionDetails;
