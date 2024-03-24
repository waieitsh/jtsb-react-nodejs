import { useEffect, useState } from 'react';
import axios from 'axios';
import { BindingResult } from '../types';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const [username, setUsername] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [bindingResult, setBindingResult] = useState<BindingResult>({} as BindingResult);
    const navigate = useNavigate();

    function signup() {
        axios
            .post(
                `http://localhost:5000/user/signup`,
                {
                    username: username,
                    password1: password1,
                    password2: password2,
                    email: email,
                },
                { withCredentials: true },
            )
            .then(function () {
                navigate('/');
            })
            .catch(function (error) {
                console.log(`signup error === ${JSON.stringify(error.response.data.message)}`);
                setBindingResult(error.response.data);
            });
    }

    useEffect(function () {
        console.log(`bindingResult === ${bindingResult.message}`);
    }, []);

    return (
        <div className="container my-3">
            <div className="my-3 border-bottom">
                <div>
                    <h4>회원가입</h4>
                </div>
            </div>
            <div className={bindingResult.message ? 'alert alert-danger' : undefined}>{bindingResult.message}</div>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    사용자ID
                </label>
                <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="password1" className="form-label">
                    비밀번호
                </label>
                <input type="password" className="form-control" onChange={(e) => setPassword1(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="password2" className="form-label">
                    비밀번호 확인
                </label>
                <input type="password" className="form-control" onChange={(e) => setPassword2(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    이메일
                </label>
                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={signup}>
                회원가입
            </button>
        </div>
    );
}

export default SignupForm;
