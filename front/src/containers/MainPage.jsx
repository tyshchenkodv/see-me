import React from 'react';
import Header from '../components/Header';
import Content from '../components/Content';

function MainPage ({userName}) {
    return (
        <>
            <Header userName={userName}/>
            <Content/>
        </>
    );
}

export default MainPage;
