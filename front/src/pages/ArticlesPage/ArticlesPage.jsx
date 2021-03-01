import React from 'react';
import ArticlesListItem from '../../components/ArticlesListItem';
import { getAllArticles } from './apiCalls';
import { useQuery } from "react-query";
import LinearProgress from '@material-ui/core/LinearProgress';

export default function ArticlesPage() {
    const { data: response, isFetching} = useQuery('articles', () => {
        const token = window.localStorage.getItem('token');
        return getAllArticles(token);
    });
    const { posts } = response?.data || [];

    return (
        !isFetching ? posts.map((post, key) =>
            <ArticlesListItem article = { post } key={key}/>
        ) : <LinearProgress />
    );
}
