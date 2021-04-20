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
import { wsConnection } from "../../ws";

function ArticlesPage({history}) {
    const {setRefetch} = useArticles();
    const {user, loading} = useAuth();
    const {getAllArticles, deleteArticleRequest, createCommentRequest, deleteCommentRequest, updateCommentRequest} = ApiCallsArticlesPage();
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
    const {mutate: createComment} = useMutation(createCommentRequest);
    const {mutate: deleteComment} = useMutation(deleteCommentRequest);
    const {mutate: updateComment} = useMutation(updateCommentRequest);

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

    const onCreateComment = useCallback(async formData => {
        try {
            await createComment(formData);
        } catch (e) {
            console.log(e);
        }
    }, [createComment]);

    const onDeleteComment = useCallback(async id => {
        try {
            await deleteComment(id);
        } catch (e) {
            console.log(e);
        }
    }, [deleteComment]);

    const onUpdateComment = useCallback(async formData => {
        try {
            await updateComment(formData);
        } catch (e) {
            console.log(e);
        }
    }, [updateComment]);

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

    useEffect(()=>{
        wsConnection.onmessage = function (event){
            const wsData = JSON.parse(event.data);
            setArticles(articles.map(article => article.id === wsData.articleId ? {
                ...article,
                comments: wsData.comments,
                commentsCount: wsData.commentsCount,
            } : article));
        }
    }, [articles]);

    return (
        <>
            {!isFetching && !loading ?
                <div>
                    {articles.slice(0, visible).map((article) => {
                        return <ArticlesListItem key={article.id}
                                                 article={article}
                                                 setSelectedArticle={setSelectedArticle}
                                                 deleteArticle={onDeleteArticle}
                                                 btnVisible={user?.id !== article?.user.id}
                                                 userId={user?.id}
                                                 createComment={onCreateComment}
                                                 deleteComment={onDeleteComment}
                                                 updateComment={onUpdateComment}/>
                    })}
                    <EditArticle updateArticle={onUpdateArticle}
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
