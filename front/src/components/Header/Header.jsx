import React from 'react';
import Logo from '../Logo';
import UserDropdown from '../UserDropdown';

export default function Header ({userFirstName, userSecondName, setPage}) {
    return (
        <header>
            <div
                className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <Logo/>
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="p-2 text-dark" onClick={() => setPage('articles')}>Articles</a>
                    <a className="p-2 text-dark" onClick={() => setPage('addArticle')}>Add article</a>
                </nav>
                <div onClick={() => setPage('profile')}>
                    <UserDropdown userFirstName={userFirstName} userSecondName={userSecondName}/>
                </div>
            </div>
        </header>
    );
}
