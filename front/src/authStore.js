import React, { createContext, useReducer } from 'react';
import Reducer from './reducers/authReducer';

const tokenString = localStorage.getItem('token') || null;
const token = JSON.parse(tokenString);

const tokenExpiresString = localStorage.getItem('tokenExpires') || null;
const tokenExpires = JSON.parse(tokenExpiresString);

const initialState = {
    user: null,
    loading: false,
    token,
    tokenExpires,
};

export const Context = createContext(initialState);

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
};

export default Store;
