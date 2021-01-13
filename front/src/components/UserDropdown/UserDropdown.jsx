import React from 'react';

export default function UserDropdown ({userName}) {
    return (
        <a className="btn btn-outline-primary">
            { userName ? `Hello, ${userName}` : 'Meet me' }
        </a>
    );
}
