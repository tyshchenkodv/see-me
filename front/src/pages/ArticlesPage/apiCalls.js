import useApi from "../../hooks/useApi";

export default function ApiCallsArticlesPage() {
    const { callApi } = useApi();

    const getAllArticles = async () => {
        return callApi('/articles',
            'get',
        );
    };

    const deleteArticleRequest = async (id) => {
        return callApi(`/articles/${id}`,
            'delete',
        );
    };

    return {
        getAllArticles,
        deleteArticleRequest,
    }
}
