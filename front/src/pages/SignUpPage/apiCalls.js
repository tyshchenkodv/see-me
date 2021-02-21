import { apiClient } from '../../config/axios';

async function signUp(data) {
    await apiClient.post('/auth/signup',
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        },
    );
}

export {
    signUp,
};
