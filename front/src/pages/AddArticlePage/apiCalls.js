import useApi from "../../hooks/useApi";

export default function ApiCallsAddArticlePage() {
    const {callApi} = useApi();

    const createArticleRequest = async (formData) => {
        return callApi('/articles',
            'post',
            formData,
        );
    }

    const updateArticleRequest = async ({ formData, id }) => {
        return callApi(`/articles/${id}`,
            'put',
            formData,
        );
    }

    const getArticleRequest = async (id) => {
        return callApi(`/articles/${id}`,
            'get',
        );
    }

    return {
        createArticleRequest,
        updateArticleRequest,
        getArticleRequest,
    };
}
