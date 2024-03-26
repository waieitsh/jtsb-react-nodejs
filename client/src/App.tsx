import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import QuestionList from './components/QuestionList';

const QuestionDetail = lazy(() => import('./components/QuestionDetail'));
const QuestionForm = lazy(() => import('./components/QuestionForm'));
const SignupForm = lazy(() => import('./components/SignupForm'));
const LoginForm = lazy(() => import('./components/LoginForm'));
const PageNotFound = lazy(() => import('./components/PageNotFound'));
const Logout = lazy(() => import('./components/Logout'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>loading...</div>}>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<QuestionList />} />
                    <Route path="/question/list" element={<QuestionList />} />
                    <Route path="/question/details/:id" element={<QuestionDetail />} />
                    <Route path="/question/create" element={<QuestionForm />} />
                    <Route path="/user/signup" element={<SignupForm />} />
                    <Route path="/user/login" element={<LoginForm />} />
                    <Route path="/user/logout" element={<Logout />} />
                    <Route path="/pageNotFound" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
