import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Profile from '../../components/Profile';

function ProfilePage({ match: { params } }) {
    const [pageType, setPageType] = useState('edit');

    useEffect(()=>{
        if(params?.id === 'edit') {
            setPageType('edit');
        } else {
            setPageType(params.id);
        }
    });

    return (
        <>
            <p>{pageType}</p>
        </>
    )
}

ProfilePage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ProfilePage;
