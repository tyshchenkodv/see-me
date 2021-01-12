import React from 'react';

export default function UserDropdown ({userName}) {
    return (
        <>
            {
                userName ? <a className="btn btn-outline-primary">Hello, {userName}</a> :
                <a className="btn btn-outline-primary">Meet me</a>
            }
        </>
    );
}
