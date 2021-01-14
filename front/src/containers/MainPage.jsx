import React, { useState } from 'react';
import Header from '../components/Header';
import Articles from '../components/Articles';
import AddArticle from '../components/AddArticle';
import Profile from '../components/Profile';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { ARTICLES_PAGE, ADD_ARTICLE_PAGE, PROFILE_PAGE } from '../constants/pages';

import GetProps from '../homework/getProps';

function MainPage () {
    const [page, setPage] = useState(ARTICLES_PAGE);
    const [userName, setUserName] = useState(null);

    const userData = {
        id: 1,
        firstName: 'Ivan',
        lastName: 'Ivanov',
        age: 25,
        avatar: {
            fileId: 1,
            file: {
                id: 1,
                name: 'photo.jpg',
                path: '/upload/photo.jpg',
                size: 1234
            }
        },
        friends: [{}, {}, {}], //array of users
        articles: [{
            title: 'Article 1',
            text: 'Some text',
            images: [{}, {}, {}], // array of files
            createdAt: '2020-12-17 19:00:00',
            editedAt: '2020-12-17 20:00:00',
            likes: [
                {userId: 2, user: {id: 2}, date: '2020-12-17 21:00:00'},
                {userId: 3, user: {id: 3}, date: '2020-12-17 22:00:00'}
            ]
        }]
    };

    return (
        <ErrorBoundary>
            <Header userName={userName} setPage={setPage}/>
            <GetProps userData={userData}/>
            { page === ARTICLES_PAGE && <Articles/> }
            { page === ADD_ARTICLE_PAGE && <AddArticle/> }
            { page === PROFILE_PAGE && <Profile setUserName={setUserName}/> }
        </ErrorBoundary>
    );
}

export default MainPage;
