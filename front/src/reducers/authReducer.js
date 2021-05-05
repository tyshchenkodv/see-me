const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTH_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'SET_AUTH':
            return {
                ...state,
                loading: false,
                ...action.payload,
            };
        case 'CLEAR_AUTH_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'CLEAR_AUTH':
            return {
                ...state,
                loading: false,
                user: null,
                token: null,
                tokenExpires: null,
            };
        default:
            return state;
    }
};

export default Reducer;
