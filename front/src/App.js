import React, {useEffect} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Grid } from "@material-ui/core";

import './App.css';
import ArticlesPage from './pages/ArticlesPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import useAuth from "./hooks/useAuth";
import LinearProgress from "@material-ui/core/LinearProgress";
import useCheckAuth from "./hooks/useCheckAuth";

function App ({ location: { pathname }, history }) {
    useCheckAuth(history, pathname);
    const {user, logout, loading} = useAuth();

    return (
        <Container>
            <ErrorBoundary>
                {loading ? <LinearProgress/> :
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Header history={history} user={user} logout={logout}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Switch>
                                <Route exact path="/" component={ArticlesPage}/>
                                <Route exact path="/signin" component={SignInPage}/>
                                <Route exact path="/signup" component={SignUpPage}/>
                                <Route exact path="/articles" component={ArticlesPage}/>
                                <Route exact path="/profiles/:id" component={ProfilePage}/>
                            </Switch>
                        </Grid>
                    </Grid>
                }
            </ErrorBoundary>
        </Container>
    );
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default withRouter(App);
