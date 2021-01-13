import React, { useState } from 'react';
import Header from '../components/Header';
import Articles from '../components/Articles';
import AddArticle from '../components/AddArticle';
import Profile from '../components/Profile';
import { ARTICLES_PAGE, ADD_ARTICLE_PAGE, PROFILE_PAGE } from '../constants/pages';

function MainPage () {
    const [page, setPage] = useState(ARTICLES_PAGE);
    const [userName, setUserName] = useState(null);

    return (
        <>
            <Header userName={userName} setPage={setPage}/>
            { page === ARTICLES_PAGE && <Articles/> }
            { page === ADD_ARTICLE_PAGE && <AddArticle/> }
            { page === PROFILE_PAGE && <Profile setUserName={setUserName}/> }
        </>
    );
}

export default MainPage;
