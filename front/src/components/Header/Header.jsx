import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Logo from '../Logo';
import UserDropdown from '../UserDropdown';

function Header ({userName}) {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(()=>{
        const token = window.localStorage.getItem('token');
        if (token){
            return setIsLogged(true);
        }else if (!token){
            return setIsLogged(false);
        }
    });

    const authButtons = <>
        <nav className="my-2 my-md-0 mr-md-3">
            <NavLink className="p-2 text-dark" exact to='/articles' >Articles</NavLink>
            <NavLink className="p-2 text-dark" exact to='/articles/add/new'>Add article</NavLink>
        </nav>
        <UserDropdown userName={userName}/>
    </>;

    const nonAuthButtons = <>
        <nav className="my-2 my-md-0 mr-md-3">
            <NavLink className="p-2 text-dark" exact to='/signin' >Sign In</NavLink>
            <NavLink className="p-2 text-dark" exact to='/signup'>Sign Up</NavLink>
        </nav>
    </>;

    return (
        <header>
            <div
                className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <Logo/>
                { isLogged ? authButtons : nonAuthButtons }
            </div>
        </header>
    );
}

Header.defaultProps = {
    userName: null,
};

Header.propTypes = {
    userName: PropTypes.string,
};

export default Header;
