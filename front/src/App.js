import './App.css';

import { Container, Grid } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/Header';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import useAuth from './hooks/useAuth';
import useCheckAuth from './hooks/useCheckAuth';
import ArticlesPage from './pages/ArticlesPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App({ location: { pathname }, history }) {
    useCheckAuth(history, pathname);
    const { user, logout, loading } = useAuth();

    return (
        <Container>
            <ErrorBoundary>
                {loading ? <LinearProgress />
                    : (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Header history={history} user={user} logout={logout} />
                            </Grid>
                            <Grid item xs={12}>
                                <Switch>
                                    <Route exact path="/" component={ArticlesPage} />
                                    <Route exact path="/signin" component={SignInPage} />
                                    <Route exact path="/signup" component={SignUpPage} />
                                    <Route exact path="/articles" component={ArticlesPage} />
                                    <Route exact path="/profiles/:id" component={ProfilePage} />
                                </Switch>
                            </Grid>
                        </Grid>
                    )}
            </ErrorBoundary>
        </Container>
    );
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(App);
