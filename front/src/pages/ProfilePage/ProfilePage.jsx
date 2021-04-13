import React from 'react';
import PropTypes from 'prop-types';
import EditProfile from '../../components/EditProfile';
import useAuth from "../../hooks/useAuth";
import ApiCallsProfilePage from "./apiCalls";
import { useQuery } from 'react-query';

function ProfilePage({ match: { params } }) {
    const { user, editUser, updateAvatar } = useAuth();
    const { getUserById } = ApiCallsProfilePage();

    const { data, isFetching } = useQuery('getUser', async () => {
        if (params?.id === 'edit') {
            return getUserById(user.id);
        }
        else return getUserById(params?.id);
    });
    const queryUser = data?.data.user;

    return (
        <>
            {!isFetching &&
                <EditProfile user={queryUser}
                         editUser={editUser}
                         updateAvatar={updateAvatar}
                         disabled={parseInt(user?.id) !== parseInt(queryUser?.id)}/>
            }
        </>
    )
}

ProfilePage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ProfilePage;
