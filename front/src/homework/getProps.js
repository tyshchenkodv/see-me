import React from 'react';
import { typeOfUserData } from './userPropTypes';

function GetProps({userData}) {
    return <div>{ JSON.stringify(userData) }</div>;
}

GetProps.propTypes = {
    userData: typeOfUserData.isRequired,
}


export default GetProps;
