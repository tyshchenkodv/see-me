import React, {useState} from 'react';
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';
import PropTypes from "prop-types";

function UserDropdown ({ history }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        setAnchorEl(null);
        history.push('/profile');
    };

    const handleEditProfile = () => {
        setAnchorEl(null);
        history.push('/profile/edit');
    };

    const handleLogout = () => {
        setAnchorEl(null);
        window.localStorage.removeItem('token');
        history.push('/signin');
    };

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleEditProfile}>Edit profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

UserDropdown.propTypes = {
    history: PropTypes.object.isRequired,
}

export default UserDropdown;
