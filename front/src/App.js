import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './App.css';
import ArticlesPage from './pages/ArticlesPage';
import AddArticlePage from './pages/AddArticlePage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import HomePage from './pages/Home';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorBoundary from './errorBoundary/ErrorBoundary';

function App ({ location: { pathname }, history }){
    const [userName, setUserName] = useState(null);

    const checkAuth = () => {
        const token = window.localStorage.getItem('token');
        if (token && (pathname === '/signin' || pathname === '/signup')) {
            history.push('/');
        }
    }

    useEffect(() => {
        checkAuth();
    });

    return (
        <div className='App container'>
            <ErrorBoundary>
                <Header userName={userName}/>
                <Switch>
                    <Route exact path="/" component={ HomePage }/>
                    <Route exact path="/signin" component={ SignInPage } />
                    <Route exact path="/signup" component={ SignUpPage } />
                    <Route exact path="/articles" component={ ArticlesPage }/>
                    <Route exact path="/articles/add" component={ AddArticlePage }/>
                    <Route exact path="/profiles">
                        <ProfilePage setUserName={setUserName}/>
                    </Route>
                </Switch>
            </ErrorBoundary>
        </div>
    );
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default withRouter(App);
