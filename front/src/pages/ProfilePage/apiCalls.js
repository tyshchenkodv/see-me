import { apiClient } from '../../config/axios';

async function getUserById(id) {
    return apiClient.get(`/users/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        },
    );
}

export {
    getUserById,
};
