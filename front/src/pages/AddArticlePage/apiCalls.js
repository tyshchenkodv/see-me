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

export {
    createArticleRequest,
};
