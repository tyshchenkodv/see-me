import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import ArticlesListItem from '../../components/ArticlesListItem';
import ApiCallsArticlesPage from './apiCalls';
import {useMutation, useQuery} from "react-query";
import LinearProgress from '@material-ui/core/LinearProgress';
import ApiCallsAddArticlePage from '../AddArticlePage/apiCalls';
import EditArticle from "../../components/EditArticle/EditArticle";
import useArticles from '../../hooks/useArticles';
import useAuth from "../../hooks/useAuth";

function ArticlesPage({history}) {
    const {setRefetch} = useArticles();
    const {user, loading} = useAuth();
    const {getAllArticles, deleteArticleRequest} = ApiCallsArticlesPage();
    const {updateArticleRequest} = ApiCallsAddArticlePage();
    const [articles, setArticles] = useState([]);
    const [visible, setVisible] = useState(5);
    const [selectedArticle, setSelectedArticle] = useState(false);
    const {data: response, isFetching, refetch: refetchArticles} = useQuery('articles', async () => {
        return getAllArticles();
    }, {manual: true,});
    const {mutate: updateArticle} = useMutation(updateArticleRequest, {
        onSuccess: () => {
            refetchArticles();
        }
    });
    const {mutate: deleteArticle} = useMutation(deleteArticleRequest, {
        onSuccess: () => {
            refetchArticles();
        }
    });

    const onUpdateArticle = useCallback(async ({formData, id}) => {
        try {
            await updateArticle({formData, id});
        } catch (e) {
            console.log(e);
        }
    }, [updateArticle]);

    const onDeleteArticle = useCallback(async (id) => {
        try {
            await deleteArticle(id);
        } catch (e) {
            console.log(e);
        }
    }, [deleteArticle]);

    const loadMore = useCallback(() => {
        setVisible(visible + 5);
    }, [visible]);

    useEffect(() => {
        if (response) {
            setRefetch(refetchArticles);
            const {posts} = response?.data || [];
            setArticles(posts);
        }
    }, [setRefetch, refetchArticles, setArticles, response]);

    return (
        <>
            {!isFetching && !loading ?
                <div>
                    {articles.slice(0, visible).map((article, index) => {
                        return <ArticlesListItem article={article}
                                                 key={index}
                                                 btnVisible={user?.id !== article?.userId}
                                                 updateArticle={onUpdateArticle}
                                                 history={history}
                                                 setSelectedArticle={setSelectedArticle}
                                                 deleteArticle={onDeleteArticle}/>
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
