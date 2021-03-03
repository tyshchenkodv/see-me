import { apiClient } from '../../config/axios';

async function createArticleRequest({ token, formData }) {
    return apiClient.post('/articles',
        formData,
        {
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        },
    );
}

async function updateArticleRequest({ token, formData, id }) {
    return apiClient.put(`/articles/${id}`,
        formData,
        {
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        },
    );
}

async function getArticleRequest({ token, id }) {
    return apiClient.get(`/articles/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        },
    );
}

export {
    createArticleRequest,
    updateArticleRequest,
    getArticleRequest,
};
