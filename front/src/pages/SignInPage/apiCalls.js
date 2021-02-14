import { apiClient } from '../../config/axios';

async function signIn(data) {
    return await apiClient.post('/auth/login',
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        },
    );
}

async function signInFacebook(req) {
    const data = {
        facebookId: req.userID,
        name: req.name,
        email: req.email,
    };
    return await apiClient.post('/auth/login/facebook',
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        },
    );
}

async function signInGoogle(req) {
    const data = {
        googleId: req.googleId,
        name: req.name,
        email: req.email,
    };
    return await apiClient.post('/auth/login/google',
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        },
    );
}

export {
    signIn,
    signInFacebook,
    signInGoogle,
};
