import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { NavLink } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { useStyles } from './styles';

function SignInPage({ history }) {
    const classes = useStyles();
    const { login, loginFacebook, loginGoogle } = useAuth();

    const responseGoogle = async ({profileObj}) => {
        await loginGoogle(profileObj);
        history.push('/');
    };

    const responseFacebook = async (profileObj) => {
        await loginFacebook(profileObj);
        history.push('/');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const reqData = {
            email: event.target.email.value,
            password: event.target.password.value,
        };

        await login(reqData);
        history.push('/');
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>

                </form>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FacebookLogin
                            appId="419752172420393"
                            fields="name,email"
                            buttonStyle={{all: 'unset'}}
                            callback={responseFacebook}
                            textButton=""
                            icon={<Button
                                type="submit"
                                fullWidth
                                color="primary"
                                className={classes.submit}>
                                Sign In with Facebook
                            </Button>}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GoogleLogin
                            clientId={'55072592253-t1g135uduulg5a40b78vjqueedkvl2ud.apps.googleusercontent.com'}
                            onSuccess={responseGoogle}
                            render={(renderProps) => <Button
                                onClick={renderProps.onClick}
                                type="submit"
                                fullWidth
                                color="primary"
                                className={classes.submit}>
                                Sign In with Google
                            </Button>}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <NavLink exact to='/signup' variant="body2">
                            {'Don\'t have an account? Sign Up'}
                        </NavLink>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

SignInPage.propTypes = {
    history: PropTypes.object.isRequired,
};

export default SignInPage;
