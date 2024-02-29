import { useEffect, useState } from 'react';
import { IAnswerListDetails, IFirst, IQuestion } from '../types';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function QuestionList() {
    const [searchParams] = useSearchParams('');
    const params = searchParams.get('page');
    const [question, setQuestion] = useState<IQuestion>({} as IQuestion);

    useEffect(
        function () {
            axios
                .get(`https://localhost:8080/question/list`, {
                    params: { page: params },
                })
                .then(function (response) {
                    setQuestion(response.data);
                })
                .catch(function (error) {
                    console.log(`error >> ${error}`);
                });
        },
        [params],
    );

    return (
        <div className="container my-3">
            <table className="table">
                <thead className="table-dark">
                    <tr className="text-center">
                        <th style={{ width: '10%' }}>번호</th>
                        <th style={{ width: '30%' }}>제목</th>
                        <th style={{ width: '30%' }}>글쓴이</th>
                        <th style={{ width: '30%' }}>작성일시</th>
                    </tr>
                </thead>

                <tbody>
                    {question.first !== undefined
                        ? question.first.map((data: IFirst, index: number) => (
                              <tr className="text-center" key={index}>
                                  <td>{data.id}</td>
                                  <td className="text-start">
                                      <a href={`/question/details/${data.id}`}>
                                          {data.subject}
                                      </a>
                                      <span className="text-danger small ms-2">
                                          {question.third.map(
                                              (data2: IAnswerListDetails) =>
                                                  data.id === data2.id &&
                                                  data2.size > 0
                                                      ? data2.size
                                                      : undefined,
                                          )}
                                      </span>
                                  </td>
                                  <td></td>
                                  <td>{data.createDate}</td>
                              </tr>
                          ))
                        : null}
                </tbody>
            </table>
            <div>
                {question.second !== undefined ? (
                    <ul className="pagination justify-content-center">
                        <li
                            className={
                                question.second[0].hasPrevious
                                    ? 'page-item'
                                    : 'page-item disabled'
                            }
                        >
                            <a
                                className="page-link"
                                href={`?page=${question.second[0].number - 1}`}
                            >
                                <span>이전</span>
                            </a>
                        </li>
                        {Array.from({
                            length: question.second[0].totalPages,
                        }).map((_, index: number) => (
                            <li
                                className={
                                    index === question.second[0].number
                                        ? 'page-item active'
                                        : 'page-item'
                                }
                                key={index}
                            >
                                <a
                                    className="page-link"
                                    href={`?page=${index}`}
                                >
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        {Array.from({
                            length: question.second[0].totalPages,
                        }).map((_, index: number) => (
                            <li
                                className={
                                    index >= question.second[0].number - 5 &&
                                    index <= question.second[0].number + 5
                                        ? 'page-item active'
                                        : 'page-item'
                                }
                                key={index}
                            />
                        ))}
                        <li
                            className={
                                question.second[0].hasNext
                                    ? 'page-item '
                                    : 'page-item disabled'
                            }
                        >
                            <a
                                className="page-link"
                                href={`?page=${question.second[0].number + 1}`}
                            >
                                <span>다음</span>
                            </a>
                        </li>
                    </ul>
                ) : null}
                <a href={'/question/create'} className="btn btn-primary">
                    질문 등록하기
                </a>
            </div>
        </div>
    );
}

export default QuestionList;
