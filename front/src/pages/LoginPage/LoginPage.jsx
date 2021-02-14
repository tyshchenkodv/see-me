import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';

function LoginPage({ history }) {
    const changeAuth = () => {
        window.localStorage.setItem('isLoggedIn', 'true');
        history.push('/');
    }

    const responseFacebook = (response) => {
        console.log(response);
    }

    return(
        <>
            <div>Login page...</div>
            <button type='button' className='btn btn-primary' onClick={changeAuth}>Sign In</button>
            <FacebookLogin
                appId="419752172420393"
                autoLoad={false}
                size="small"
                fields="name,email,picture"
                callback={responseFacebook} />
        </>
    );
}

LoginPage.propTypes = {
    history: PropTypes.object.isRequired,
}

export default LoginPage;
