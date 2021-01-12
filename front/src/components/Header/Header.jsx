import React from 'react';
import Logo from '../Logo';
import UserDropdown from '../UserDropdown';
import { ARTICLES_PAGE, ADD_ARTICLE_PAGE, PROFILE_PAGE } from '../../constants/pages';

export default function Header ({userName, setPage}) {
    const handleArticlesPageClick = () => {
        setPage(ARTICLES_PAGE);
    }
    const handleAddArticlePageClick = () => {
        setPage(ADD_ARTICLE_PAGE);
    }
    const handleProfilePageClick = () => {
        setPage(PROFILE_PAGE);
    }

    return (
        <header>
            <div
                className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <Logo/>
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="p-2 text-dark" onClick={handleArticlesPageClick}>Articles</a>
                    <a className="p-2 text-dark" onClick={handleAddArticlePageClick}>Add article</a>
                </nav>
                <div onClick={handleProfilePageClick}>
                    <UserDropdown userName={userName}/>
                </div>
            </div>
        </header>
    );
}
