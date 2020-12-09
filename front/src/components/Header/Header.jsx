import React from 'react';
import Logo from '../Logo';
import UserDropdown from '../UserDropdown';

export default function Header ({userName}) {
    return (
        <>
            <Logo/>
            <UserDropdown userName={userName}/>
        </>
    );
}
