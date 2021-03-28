import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditProfile from '../../components/EditProfile';
import Profile from '../../components/Profile';

const USER = {
    name: 'User',
    email: 'user@gmail.com',
    phone: '+123456789',
    university: 'SumDU',
    avatar: null,
};

function ProfilePage({ match: { params } }) {
    const [pageType, setPageType] = useState('edit');
    const [user, setUser] = useState({});

    useEffect(()=>{
        if(params?.id === 'edit') {
            setPageType('edit');
        } else {
            setPageType(params.id);
            setUser({...USER, id: params.id});
        }
    }, [params.id]);

    return (
        <>
            {pageType === 'edit' ?
                <EditProfile user={user} setUser={setUser}/> :
                <Profile />
            }
        </>
    )
}

ProfilePage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ProfilePage;
