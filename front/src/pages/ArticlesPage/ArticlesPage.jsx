import React, {useState, useEffect, useCallback} from 'react';
import ArticlesListItem from '../../components/ArticlesListItem';
import { getAllArticles } from './apiCalls';
import { useQuery } from "react-query";
import LinearProgress from '@material-ui/core/LinearProgress';

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [visible, setVisible] = useState(5);

    const loadMore = useCallback(() => {
        setVisible(visible + 5);
    }, []);

    const {data: response, isFetching} = useQuery('articles', () => {
        const token = window.localStorage.getItem('token');
        return getAllArticles(token);
    });

    useEffect(() => {
        if (response) {
            const {posts} = response?.data || [];
            setArticles(posts);
        }
    }, [isFetching]);

    return (
        <>
            {!isFetching ?
                <div>
                    {articles.slice(0, visible).map((article, index) => {
                        return <ArticlesListItem article={article} key={index}/>
                    })}
                    <button onClick={loadMore}
                            type="button"
                            className="btn btn-default"
                            hidden={visible >= articles.length}>Load more
                    </button>
                </div>
                : <LinearProgress/>}
        </>);
}
