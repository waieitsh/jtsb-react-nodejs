import { useState } from 'react';
import axios from 'axios';
import { BindingResult } from '../types';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [bindingResult, setBindingResult] = useState<BindingResult>({} as BindingResult);
    const navigate = useNavigate();

    function requestLogin() {
        axios
            .post(`http://localhost:5000/user/login`, { username: username, password: password })
            .then(function (response) {
                localStorage.setItem('token', response.data.token as string);
                localStorage.setItem('username', btoa(username));
                navigate('/');
            })
            .catch(function (error) {
                setBindingResult(error.response.data);
            });
    }

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
            <input type="submit" value="로그인" className="btn btn-primary" onClick={requestLogin} />
        </div>
    );
}

export default LoginForm;
