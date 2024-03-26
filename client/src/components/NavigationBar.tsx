import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
    const [loginUser, setLoginUser] = useState<string>('');
    const [sessionUser, setSessionUser] = useState<string>('');
    const navigate = useNavigate();

    useEffect(
        function () {
            const _loginUser = Buffer.from((localStorage.getItem('loginUser') as string) || '', 'base64').toString(
                'ascii',
            );
            const _sessionUser = Buffer.from((localStorage.getItem('sessionUser') as string) || '', 'base64').toString(
                'ascii',
            );

            setLoginUser(_loginUser);
            setSessionUser(_sessionUser);
        },
        [loginUser, sessionUser, navigate],
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    SBB
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {loginUser !== sessionUser || (loginUser === '' && sessionUser === '') ? (
                                <a className="nav-link" href="/user/login">
                                    로그인
                                </a>
                            ) : (
                                <a className="nav-link" href="/user/logout">
                                    로그아웃
                                </a>
                            )}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/user/signup">
                                회원가입
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
