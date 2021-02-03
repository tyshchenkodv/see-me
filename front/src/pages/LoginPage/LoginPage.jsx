import React from 'react';
import PropTypes from 'prop-types';

function LoginPage({ history }) {
    const changeAuth = () => {
        window.localStorage.setItem('isLoggedIn', 'true');
        history.push('/');
    }

    return(
        <>
            <div>Login page...</div>
            <button type='button' className='btn btn-primary' onClick={changeAuth}>Sign In</button>
        </>
    );
}

LoginPage.propTypes = {
    history: PropTypes.object.isRequired,
}

export default LoginPage;
