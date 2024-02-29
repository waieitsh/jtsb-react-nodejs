import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [tokenReady, setTokenReady] = useState<boolean>(false);

    function requestToken() {
        axios
            .post(
                `https://localhost:9000/token`,
                {
                    username: username,
                    password: password,
                },
                { withCredentials: true },
            )
            .then(function (response) {
                console.log(
                    `requestToken response >>>>>>>>>>>>>> ${response.data}`,
                );
                setTokenReady(!tokenReady);
            })
            .catch(function (error) {
                console.log(
                    `oauth2/token error >>>>>>>>>>> ${JSON.stringify(
                        error.response.msg,
                    )}`,
                );
            });
    }

    function loginRequest() {
        requestToken();

        if (tokenReady) {
            axios
                .post(`https://localhost:8080/user/login`, null, {
                    withCredentials: true,
                })
                .then(function (response) {
                    console.log(`response >>>>> ${JSON.stringify(response)}`);
                })
                .catch(function (error) {
                    console.log(`error >>>>> ${JSON.stringify(error)}`);
                });
        }
    }

    return (
        <div className="container my-3">
            {/*<div th:if="${param.error}">
                    <div className="alert alert-danger">
                        사용자ID 또는 비밀번호를 확인해 주세요.
                    </div>
                </div>*/}
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    사용자ID
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUsername(e.target.value)
                    }
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                />
            </div>
            <input
                type="submit"
                value="로그인"
                className="btn btn-primary"
                onClick={loginRequest}
            />
        </div>
    );
}

export default LoginForm;
