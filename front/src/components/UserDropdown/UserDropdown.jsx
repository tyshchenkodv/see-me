import React from 'react';
import PropTypes from 'prop-types';

function UserDropdown ({userName}) {
    return (
        <a className="btn btn-outline-primary">
            { userName ? `Hello, ${userName}` : 'Meet me' }
        </a>
    );
}

UserDropdown.defaultProps = {
    userName: null,
};

UserDropdown.propTypes = {
    userName: PropTypes.string,
};

export default UserDropdown;
