import React from 'react';
import PropTypes from 'prop-types';

function LoginPage({setIsLoggedIn}) {
    const changeAuth = () => {
        setIsLoggedIn(true);
    }

    return(
        <>
            <div>Login page...</div>
            <button type='button' className='btn btn-primary' onClick={changeAuth}>Sign In</button>
        </>
    );
};

LoginPage.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginPage;
