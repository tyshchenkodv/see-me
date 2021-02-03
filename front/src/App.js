import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { pathToRegexp } from 'path-to-regexp';

import './App.css';
import ArticlesPage from './pages/ArticlesPage';
import AddArticlePage from './pages/AddArticlePage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';
import ErrorBoundary from './errorBoundary/ErrorBoundary';

import HomeworkComponent from './HomeworkComponent';

function App ({ location: { pathname }, history }){
    const [userName, setUserName] = useState(null);

    const checkAuth = () => {
        const isLoggedIn = window.localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn && pathname !== '/login') {
            history.push('/login');
        } else if (isLoggedIn && pathname === '/login') {
            history.push('/');
        }
    }

    useEffect(() => {
        checkAuth();
    });

    //Homework
    const path = pathToRegexp('/users' +
        '/:id(\\d+)?' +
        '/(edit|' +
        'avatar|' +
        'avatar/edit' +
        '|avatar/delete' +
        '|file/\\d+-[a-zA-Z]{1,10}-\\d{4}-\\d{2}-\\d{2}.(?:docx|jpeg|pdf|txt)/v.\\d.\\d.\\d)?');


    const checkDate = (url) => {
        if (path.exec(url)) {
            if (path.exec(url)[2]) {
                const dateInUrl = path.exec(url)[2].match(/(\d{4})-(\d{2})-(\d{2})/);
                if (dateInUrl) {
                    const urlDate = new Date(`${dateInUrl[1]}-${dateInUrl[2]}-${dateInUrl[3]}`);
                    const todayDate = new Date();
                    return urlDate <= todayDate;
                }
            }
        }
        return true;
    };
    //---

    return (
        <div className='App container'>
            <ErrorBoundary>
                <Header userName={userName}/>
                <Switch>
                    <Route exact path="/" component={ HomePage }/>
                    <Route exact path="/login" component={ LoginPage } />
                    <Route exact path="/articles" component={ ArticlesPage }/>
                    <Route exact path="/articles/add" component={ AddArticlePage }/>
                    <Route exact path="/profiles">
                        <ProfilePage setUserName={setUserName}/>
                    </Route>
                    <Route exact path={ path }>
                        {checkDate(pathname) ? <HomeworkComponent/> : <></>}
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
