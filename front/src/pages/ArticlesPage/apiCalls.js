import { apiClient } from '../../config/axios';

async function getAllArticles(token) {
    return apiClient.get('/articles',
        {
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        },
    );
}

async function deleteArticleRequest({token, id}) {
    return apiClient.delete(`/articles/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        },
    );
}

export {
    getAllArticles,
    deleteArticleRequest,
};
