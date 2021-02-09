import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function UserDropdown ({userName}) {
    return (
        <NavLink exact to='/profiles' className="btn btn-outline-primary">
            { userName ? `Hello, ${userName}` : 'Meet me' }
        </NavLink>
    );
}

UserDropdown.defaultProps = {
    userName: null,
};

UserDropdown.propTypes = {
    userName: PropTypes.string,
};

export default UserDropdown;
