import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import QuestionList from './components/QuestionList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuestionDetails from './components/QuestionDetails';
import QuestionForm from './components/QuestionForm';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import PageNotFound from './components/PageNotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<QuestionList />} />
                <Route path="/question/list" element={<QuestionList />} />
                <Route
                    path="/question/details/:id"
                    element={<QuestionDetails />}
                />
                <Route path="/question/create" element={<QuestionForm />} />
                <Route path="/user/signup" element={<SignupForm />} />
                <Route path="/user/login" element={<LoginForm />} />
                <Route path="/pageNotFound" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
