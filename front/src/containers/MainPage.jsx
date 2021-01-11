import React, { useState } from 'react';
import Header from '../components/Header';
import Articles from '../components/Articles';
import AddArticle from '../components/AddArticle';
import Profile from '../components/Profile';

function MainPage () {
    const [page, setPage] = useState('articles');
    const [userFirstName, setUserFitstName] = useState(null);
    const [userSecondName, setUserSecondName] = useState(null);

    return (
        <>
            <Header userFirstName={userFirstName} userSecondName={userSecondName} setPage={setPage}/>
            { page === 'articles' && <Articles/> }
            { page === 'addArticle' && <AddArticle/> }
            { page === 'profile' && <Profile setUserFitstName={setUserFitstName} setUserSecondName={setUserSecondName}/> }
        </>
    );
}

export default MainPage;
