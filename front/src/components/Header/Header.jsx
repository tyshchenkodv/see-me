import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Logo from '../Logo';
import UserDropdown from '../UserDropdown';

function Header ({userName}) {
    return (
        <header>
            <div
                className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <Logo/>
                <nav className="my-2 my-md-0 mr-md-3">
                    <NavLink className="p-2 text-dark" exact to='/articles' >Articles</NavLink>
                    <NavLink className="p-2 text-dark" exact to='/articles/add'>Add article</NavLink>
                </nav>
                <UserDropdown userName={userName}/>
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
