import React, {useState} from 'react';
import { Button, Menu, MenuItem, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";

function UserDropdown ({ history, logout, user }) {
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
        history.push(`/profiles/edit`);
    };

    const handleLogout = async () => {
        setAnchorEl(null);
        logout();
        history.push('/signin');
    };

    return (
        <div>
            {user && <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                startIcon={<Avatar src={`http://localhost:3333/users/avatar/${user?.avatar}`} />}
            >
                {user?.firstName + ' ' + user?.secondName}
            </Button>
            }
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
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

UserDropdown.propTypes = {
    history: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

export default UserDropdown;
