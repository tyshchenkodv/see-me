import { useCallback, useContext } from 'react';
import { Context } from '../articlesStore';

export default function useArticles() {
    const [state, dispatch] = useContext(Context);

    const setRefetch = useCallback(
        (refetchArticles) => {
            try {
                dispatch({
                    type: 'SET_REFETCH',
                    payload: {
                        refetchArticles,
                    },
                });
            }catch (e) {
                console.log('Login error with error: ' + e);
            }
        },
        [dispatch],
    );

    return {
        refetchArticles: state.refetchArticles,
        setRefetch,
    };
}
