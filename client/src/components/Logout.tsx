import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(
        function () {
            localStorage.removeItem('loginUser');
            localStorage.removeItem('sessionUser');
            localStorage.removeItem('token');
            navigate('/');
        },
        [navigate],
    );

    return <></>;
}

export default Logout;
