import React from 'react';
import PropTypes from 'prop-types';
import EditProfile from '../../components/EditProfile';
import useAuth from "../../hooks/useAuth";
import { useQuery } from 'react-query';
import { getUserById } from "./apiCalls";

function ProfilePage({ match: { params } }) {
    const { user, editUser, updateAvatar } = useAuth();

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
                         disabled={user?.id !== queryUser?.id}/>
            }
        </>
    )
}

ProfilePage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ProfilePage;
