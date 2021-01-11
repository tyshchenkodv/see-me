import React from 'react';

export default function UserDropdown ({userFirstName, userSecondName}) {
    return (
        <>
            {(!userFirstName && !userSecondName) &&
            <a className="btn btn-outline-primary">Meet me</a>}
            {(userFirstName || userSecondName) &&
            <a className="btn btn-outline-primary">Hello, {userFirstName + ' ' + userSecondName}</a>}
        </>
    );
}
