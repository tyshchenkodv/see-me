const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_REFETCH':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export default Reducer;
