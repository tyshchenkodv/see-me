import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../Logo';
import UserDropdown from '../UserDropdown';
import { ARTICLES_PAGE, ADD_ARTICLE_PAGE, PROFILE_PAGE } from '../../constants/pages';

function Header ({userName, setPage}) {
    const changePageClick = (page) => () => setPage(page);

    return (
        <header>
            <div
                className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <Logo/>
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="p-2 text-dark" onClick={changePageClick(ARTICLES_PAGE)}>Articles</a>
                    <a className="p-2 text-dark" onClick={changePageClick(ADD_ARTICLE_PAGE)}>Add article</a>
                </nav>
                <div onClick={changePageClick(PROFILE_PAGE)}>
                    <UserDropdown userName={userName}/>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    userName: PropTypes.string,
    setPage: PropTypes.func,
};

export default Header;
