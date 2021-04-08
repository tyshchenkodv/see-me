import { useCallback, useContext } from 'react';
import axios from 'axios';
import { apiClient } from '../config/axios';
import { Context } from '../authStore';

export default function useAuth() {
    const [state, dispatch] = useContext(Context);

    const signup = useCallback(
        (formData) => axios.post('http://localhost:3333/auth/signup', formData),
        []
    );

    const login = useCallback(
        async ({ email, password }) => {
            dispatch({
                type: 'SET_AUTH_REQUEST',
            });
            try {
                await axios
                    .post('http://localhost:3333/auth/login', { email, password })
                    .then(res => {
                        dispatch({
                            type: 'SET_AUTH',
                            payload: {
                                user: res.data.user,
                                token: res.data.token,
                            },
                        });
                        localStorage.setItem(
                            'token',
                            JSON.stringify(res.data.token),
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
                await axios
                    .post('http://localhost:3333/auth/login/facebook', data)
                    .then(res => {
                        dispatch({
                            type: 'SET_AUTH',
                            payload: {
                                user: res.data.user,
                                token: res.data.token,
                            },
                        });
                        localStorage.setItem(
                            'token',
                            JSON.stringify(res.data.token),
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
                await axios
                    .post('http://localhost:3333/auth/login/google', data)
                    .then(res => {
                        dispatch({
                            type: 'SET_AUTH',
                            payload: {
                                user: res.data.user,
                                token: res.data.token,
                            },
                        });
                        localStorage.setItem(
                            'token',
                            JSON.stringify(res.data.token),
                        );
                    });
            }catch (e) {
                console.log('Login error with error: ' + e);
            }
        },
        [dispatch],
    );

    const logout = async () => {
        dispatch({
            type: 'CLEAR_AUTH_REQUEST',
        });
        if (state.token) {
            dispatch({
                type: 'CLEAR_AUTH',
            });
            localStorage.removeItem('token');
        }

        return false;
    }

    const editUser = useCallback(async ({user, id}) => {
        dispatch({
            type: 'SET_AUTH_REQUEST',
        });
        try {
            await apiClient
                .put(`/users/${id}/edit`, {user: user}, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
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
        }catch (e) {
            console.log('Login error with error: ' + e);
        }
    }, [state, dispatch]);

    const getUserByToken = useCallback(async (token) => {
        dispatch({
            type: 'SET_AUTH_REQUEST',
        });
        try {
            await apiClient
                .get('/users/token', {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'token': token,
                    }})
                .then((res) => {
                    dispatch({
                        type: 'SET_AUTH',
                        payload: {
                            user: res.data.user,
                            token: res.data.token,
                        }
                    });
                });
        }catch (e) {
            console.log('Login error with error: ' + e);
        }
    }, [dispatch]);

    const updateAvatar = useCallback(async (formData, id) => {
        dispatch({
            type: 'SET_AUTH_REQUEST',
        });
        try {
            await apiClient
                .put(`/users/${id}/updateAvatar`, formData,{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
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
        }catch (e) {
            console.log('Login error with error: ' + e);
        }
    }, [state.accessToken, dispatch]);

    return {
        user: state.user,
        token: state.token,
        loading: state.loading,
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
