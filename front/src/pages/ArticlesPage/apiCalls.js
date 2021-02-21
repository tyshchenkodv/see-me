import { apiClient } from '../../config/axios';

async function getAllArticles(token) {
    return apiClient.get('/posts',
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
};
