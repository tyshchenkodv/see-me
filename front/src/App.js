import React, {useState, useEffect} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './App.css';
import ArticlesPage from './pages/ArticlesPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import HomePage from './pages/Home';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { Container, Grid } from "@material-ui/core";

function App ({ location: { pathname }, history }) {
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
        <Container>
            <ErrorBoundary>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Header history={history}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/signin" component={SignInPage}/>
                            <Route exact path="/signup" component={SignUpPage}/>
                            <Route exact path="/articles" component={ArticlesPage}/>
                            <Route exact path="/profiles/:id" component={ProfilePage}/>
                        </Switch>
                    </Grid>
                </Grid>
            </ErrorBoundary>
        </Container>
    );
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default withRouter(App);
