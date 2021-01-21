import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './App.css';
import ArticlesPage from './pages/ArticlesPage';
import AddArticlePage from './pages/AddArticlePage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';
import ErrorBoundary from './errorBoundary/ErrorBoundary';

function App ({ location: { pathname }, history }){
    const [userName, setUserName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAuth = () => {
        if (!isLoggedIn && pathname !== '/login') {
            history.push('/login');
        } else if (isLoggedIn && pathname === '/login') {
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
                    <Route exact path="/login">
                        <LoginPage setIsLoggedIn={setIsLoggedIn}/>
                    </Route>
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
