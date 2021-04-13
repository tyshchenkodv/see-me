import { useCallback, useContext } from 'react';
import { apiClient } from '../config/axios';
import { Context } from '../authStore';
import {isNotExpired} from "../utils/isNotExpired";

export default function useAuth() {
    const [state, dispatch] = useContext(Context);

    const refreshToken = useCallback(async () => {
        dispatch({
            type: 'SET_AUTH_REQUEST',
        });
        try {
            await apiClient
                .get(`/auth/token`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'token': state.token,
                    }})
                .then((res) => {
                    dispatch({
                        type: 'SET_AUTH',
                        payload: {
                            token: res.data.token,
                            tokenExpires: res.data.tokenExpires,
                        }
                    });
                    localStorage.setItem(
                        'token',
                        JSON.stringify(res.data.token),
                    );
                    localStorage.setItem(
                        'tokenExpires',
                        JSON.stringify(res.data.tokenExpires),
                    );
                });
        }catch (e) {
            console.log('Login error with error: ' + e);
        }
    }, [state, dispatch]);

    const signup = useCallback(
        (formData) => apiClient.post('/auth/signup', formData),
        []
    );

    const login = useCallback(
        async ({ email, password }) => {
            dispatch({
                type: 'SET_AUTH_REQUEST',
            });
            try {
                await apiClient.post(
                    '/auth/login',
                    { email, password }
                ).then(res => {
                    dispatch({
                        type: 'SET_AUTH',
                        payload: {
                            user: res.data.user,
                            token: res.data.token,
                            tokenExpires: res.data.tokenExpires,
                        },
                    });
                    localStorage.setItem(
                        'token',
                        JSON.stringify(res.data.token),
                    );
                    localStorage.setItem(
                        'tokenExpires',
                        JSON.stringify(res.data.tokenExpires),
                    );
                });
            }catch (e) {
                console.log('Login error with error: ' + e);
            }
        },
        [dispatch],
    );

    const loginFacebook = useCallback(
        async (data) => {
            dispatch({
                type: 'SET_AUTH_REQUEST',
            });
            try {
                await apiClient
                    .post('/auth/login/facebook', data)
                    .then(res => {
                        dispatch({
                            type: 'SET_AUTH',
                            payload: {
                                user: res.data.user,
                                token: res.data.token,
                                tokenExpires: res.data.tokenExpires,
                            },
                        });
                        localStorage.setItem(
                            'token',
                            JSON.stringify(res.data.token),
                        );
                        localStorage.setItem(
                            'tokenExpires',
                            JSON.stringify(res.data.tokenExpires),
                        );
                    });
            }catch (e) {
                console.log('Login error with error: ' + e);
            }
        },
        [dispatch],
    );

    const loginGoogle = useCallback(
        async (data) => {
            dispatch({
                type: 'SET_AUTH_REQUEST',
            });
            try {
                await apiClient
                    .post('/auth/login/google', data)
                    .then(res => {
                        dispatch({
                            type: 'SET_AUTH',
                            payload: {
                                user: res.data.user,
                                token: res.data.token,
                                tokenExpires: res.data.tokenExpires,
                            },
                        });
                        localStorage.setItem(
                            'token',
                            JSON.stringify(res.data.token),
                        );
                        localStorage.setItem(
                            'tokenExpires',
                            JSON.stringify(res.data.tokenExpires),
                        );
                    });
            }catch (e) {
                console.log('Login error with error: ' + e);
            }
        },
        [dispatch],
    );

    const logout = () => {
        dispatch({
            type: 'CLEAR_AUTH_REQUEST',
        });
        if (state.token) {
            dispatch({
                type: 'CLEAR_AUTH',
            });
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpires');
        }

        return false;
    }

    const editUser = useCallback(async ({user, id}) => {
        dispatch({
            type: 'SET_AUTH_REQUEST',
        });
        try {
            if (isNotExpired(state.tokenExpires)) {
                await apiClient
                    .put(`/users/${id}/edit`, {user: user}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': state.token,
                        }})
                    .then((res) => {
                        dispatch({
                            type: 'SET_AUTH',
                            payload: {
                                user: res.data,
                            }
                        });
                    });
            } else await refreshToken();
        }catch (e) {
            console.log('Login error with error: ' + e);
        }
    }, [state.token, state.tokenExpires, dispatch, refreshToken]);

    const getUserByToken = useCallback(async () => {
        dispatch({
            type: 'SET_AUTH_REQUEST',
        });
        try {
            if (isNotExpired(state.tokenExpires)) {
                await apiClient
                    .get('/users/token', {
                        headers: {
                            'Content-Type': 'application/json',
                            token: state.token,
                        }
                    })
                    .then((res) => {
                        dispatch({
                            type: 'SET_AUTH',
                            payload: {
                                user: res.data.user,
                                token: res.data.token,
                                tokenExpires: res.data.tokenExpires,
                            }
                        });
                    });
            } else await refreshToken();
        } catch (e) {
            console.log('Login error with error: ' + e);
        }
    }, [state.token, state.tokenExpires, dispatch, refreshToken]);

    const updateAvatar = useCallback(async (formData, id) => {
        dispatch({
            type: 'SET_AUTH_REQUEST',
        });
        try {
            if (isNotExpired(state.tokenExpires)) {
                await apiClient
                    .put(`/users/${id}/updateAvatar`, formData,{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'token': state.token,
                        }})
                    .then((res) => {
                        dispatch({
                            type: 'SET_AUTH',
                            payload: {
                                user: res.data,
                            }
                        });
                    });
            } else await refreshToken();
        }catch (e) {
            console.log('Login error with error: ' + e);
        }
    }, [state.token, state.tokenExpires, dispatch, refreshToken]);

    return {
        user: state.user,
        token: state.token,
        tokenExpires: state.tokenExpires,
        loading: state.loading,
        refreshToken,
        editUser,
        getUserByToken,
        updateAvatar,
        signup,
        login,
        loginFacebook,
        loginGoogle,
        logout,
    };
}
