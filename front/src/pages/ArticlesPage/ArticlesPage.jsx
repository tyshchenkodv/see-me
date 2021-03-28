import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import ArticlesListItem from '../../components/ArticlesListItem';
import { getAllArticles } from './apiCalls';
import {useMutation, useQuery} from "react-query";
import LinearProgress from '@material-ui/core/LinearProgress';
import {updateArticleRequest} from "../AddArticlePage/apiCalls";
import EditArticle from "../../components/EditArticle/EditArticle";

function ArticlesPage({history}) {
    const [articles, setArticles] = useState([]);
    const [visible, setVisible] = useState(5);
    const [selectedArticle, setSelectedArticle] = useState(false);
    const {mutate: updateArticle} = useMutation(updateArticleRequest);

    const onUpdateArticle = useCallback(async ({formData, id}) => {
        const token = window.localStorage.getItem('token');
        try {
            await updateArticle({token, formData, id});
        } catch (e) {
            console.log(e);
        }
    }, [updateArticle]);

    const loadMore = useCallback(() => {
        setVisible(visible + 5);
    }, [visible]);

    const {data: response, isFetching} = useQuery('articles', () => {
        const token = window.localStorage.getItem('token');
        return getAllArticles(token);
    });

    useEffect(() => {
        if (response) {
            const {posts} = response?.data || [];
            setArticles(posts);
        }
    }, [setArticles, response]);

    return (
        <>
            {!isFetching ?
                <div>
                    {articles.slice(0, visible).map((article, index) => {
                        return <ArticlesListItem article={article}
                                                 key={index}
                                                 updateArticle={onUpdateArticle}
                                                 history={history}
                                                 setSelectedArticle={setSelectedArticle}/>
                    })}
                    <EditArticle updateArticle={updateArticle}
                                 history={history}
                                 setSelectedArticle={setSelectedArticle}
                                 selectedArticle={selectedArticle}/>
                    <button onClick={loadMore}
                            type="button"
                            className="btn btn-default"
                            hidden={visible >= articles.length}>Load more
                    </button>
                </div>
                : <LinearProgress/>}
        </>);
}

ArticlesPage.propTypes = {
    history: PropTypes.object.isRequired,
}

export default ArticlesPage;
