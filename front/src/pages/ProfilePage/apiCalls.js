import useApi from '../../hooks/useApi';

export default function ApiCallsProfilePage() {
    const { callApi } = useApi();

    const getUserById = async (id) => {
        return callApi(`/users/${ id }`,
            'get',
        );
    };

    return {
        getUserById,
    };
}
