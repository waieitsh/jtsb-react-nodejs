import { useEffect, useState } from 'react';
import axios from 'axios';
import { BindingResult } from '../types';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [bindingResult, setBindingResult] = useState<BindingResult>({} as BindingResult);
    const [clicked, setClicked] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(
        function () {
            if (clicked) {
                axios
                    .post(`http://localhost:5000/user/login`, { username: username, password: password })
                    .then(function (response) {
                        localStorage.setItem('token', response.data.token as string);
                        localStorage.setItem('loginUser', Buffer.from(username).toString('base64'));
                    })
                    .then(function () {
                        const token = localStorage.getItem('token') || '';

                        axios
                            .post(`http://localhost:5000/token/verifyToken`, { token: token })
                            .then(function (response) {
                                console.log(`response123 ==== ${JSON.stringify(response)}`);
                                localStorage.setItem(
                                    'sessionUser',
                                    Buffer.from(response.data.username).toString('base64'),
                                );
                            })
                            .catch(function (error) {
                                console.log(`error ==== ${JSON.stringify(error)}`);
                                setBindingResult(error.response.data);
                            });
                        navigate('/');
                    })
                    .catch(function (error) {
                        setBindingResult(error.response.data);
                    });
            }
        },
        [clicked, username, password, navigate],
    );

    return (
        <div className="container my-3">
            <div className={bindingResult.message ? 'alert alert-danger' : undefined}>{bindingResult.message}</div>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    사용자ID
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    비밀번호
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <input type="submit" value="로그인" className="btn btn-primary" onClick={() => setClicked(!clicked)} />
        </div>
    );
}

export default LoginForm;
