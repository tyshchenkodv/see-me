import useApi from '../../hooks/useApi';

export default function ApiCallsArticlesPage() {
    const { callApi } = useApi();

    const getAllArticles = async () => {
        return callApi('/articles',
            'get',
        );
    };

    const deleteArticleRequest = async (id) => {
        return callApi(`/articles/${ id }`,
            'delete',
        );
    };

    const createCommentRequest = async (formData) => {
        return callApi('/comments', 'post', formData);
    };

    const updateCommentRequest = async (formData) => {
        return callApi(`/comments/${ formData.id }`, 'put', formData);
    };

    const deleteCommentRequest = async (id) => {
        return callApi(`/comments/${ id }`, 'delete');
    };

    return {
        getAllArticles,
        deleteArticleRequest,
        createCommentRequest,
        deleteCommentRequest,
        updateCommentRequest,
    };
}
