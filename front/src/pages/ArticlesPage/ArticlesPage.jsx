import React, {useEffect, useState} from 'react';
import ArticlesListItem from '../../components/ArticlesListItem';
import { getAllArticles } from './apiCalls';

export default function ArticlesPage() {
    const [articlesList, setArticlesList] = useState([]);

    const getArticles = async () => {
        const token = window.localStorage.getItem('token');
        const { data: { posts } } = await getAllArticles(token);
        setArticlesList(posts);
    }

    useEffect(getArticles, []);

    return (
        articlesList.map((article, key) =>
            <ArticlesListItem article = { article } key={key}/>
        )
    );
}
