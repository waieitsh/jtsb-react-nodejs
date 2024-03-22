import { useEffect, useState } from 'react';
import { IQuestion } from '../types';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function QuestionList() {
    const [searchParams] = useSearchParams('');
    const param = Number(searchParams.get('page'));
    const [questions, setQuestions] = useState<IQuestion>({} as IQuestion);
    const [page, setPage] = useState<number>(param);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(
        function () {
            axios
                .get(`http://localhost:5000/question/list`, {
                    params: { page: param },
                })
                .then(function (response) {
                    setQuestions(response.data);
                    setTotalPages(response.data.count / 10);
                })
                .catch(function (error) {
                    console.log(`error >> ${error}`);
                });
        },
        [param],
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
                    {questions.data?.map((question) => (
                        <tr className="text-center" key={question.id}>
                            <td>{question.id}</td>
                            <td className="text-start">
                                <a href={`/question/details/${question.id}`}>{question.subject}</a>
                                <span className="text-danger small ms-2">
                                    {question.answers.map((answer) =>
                                        question.id === answer.question_id ? question.answers.length : undefined,
                                    )}
                                </span>
                            </td>
                            <td>{question.site_user.username}</td>
                            <td>{question.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <ul className="pagination justify-content-center">
                    <li className={page > 0 ? 'page-item' : 'page-item disabled'}>
                        <a className="page-link" href={`?page=${page - 1}`}>
                            <span>이전</span>
                        </a>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30%' }}>
                        <input
                            type="text"
                            name="page"
                            className="page-link"
                            defaultValue={page + 1}
                            style={{ width: '20%', textAlign: 'center' }}
                            onChange={(e) => setPage(Number(e.target.value))}
                        />
                        <div style={{ width: '10%', paddingLeft: '3.5%' }}>/</div>
                        <div className="page-link" style={{ width: '20%', textAlign: 'center' }}>
                            {totalPages}
                        </div>
                    </li>
                    <li className={(page + 1) * 10 < questions.count ? 'page-item ' : 'page-item disabled'}>
                        <a className="page-link" href={`?page=${page + 1}`}>
                            <span>다음</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-1%' }}>
                <a className="btn btn-primary" href={`?page=${page - 1}`}>
                    <span>이동</span>
                </a>
            </div>
            <a className="btn btn-primary" href={'/question/create'}>
                질문 등록하기
            </a>
        </div>
    );
}

export default QuestionList;
