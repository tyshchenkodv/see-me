import React from 'react';
import PropTypes from 'prop-types';
import Profile from '../../components/Profile';

function ProfilePage({setUserName}) {
    return (
        <Profile setUserName={setUserName} />
    )
}

ProfilePage.propTypes = {
    setUserName: PropTypes.func.isRequired,
};

export default ProfilePage;
