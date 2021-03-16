import React, {useState, useEffect, useCallback} from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useStyles } from './styles';
import UserDropdown from "../UserDropdown/UserDropdown";
import PropTypes from "prop-types";
import {useMutation} from "react-query";
import {createArticleRequest} from "../../pages/AddArticlePage/apiCalls";
import AddArticle from "../AddArticle";

function Header ({ history }) {
    const classes = useStyles();
    const [isLogged, setIsLogged] = useState(false);
    const [open, setOpen] = useState(false);
    const {mutate: createArticle} = useMutation(createArticleRequest);
    const token = window.localStorage.getItem('token');

    const onCreateArticle = useCallback(async formData => {
        try {
            await createArticle({token, formData});
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        if (token) {
            return setIsLogged(true);
        } else if (!token) {
            return setIsLogged(false);
        }
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const authButtons = <>
        <Button
            color="inherit"
            component={NavLink}
            exact to='/articles'
        >
            Articles
        </Button>
        <Button
            color="inherit"
            onClick={handleClickOpen}
        >
            Add article
        </Button>
        <AddArticle history={history}
                    createArticle={onCreateArticle}
                    setOpen={setOpen}
                    open={open}/>
        <UserDropdown history={history}/>
    </>

    const nonAuthButtons = <>
        <Button
            color="inherit"
            component={NavLink}
            exact to='/signup'
        >
            Sign Up
        </Button>
        <Button
            color="inherit"
            component={NavLink}
            exact to='/signin'
        >
            Sign In
        </Button>
    </>;

    return (
        <AppBar position="static" color='default'>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    SeeME
                </Typography>
                {isLogged ? authButtons : nonAuthButtons}
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    history: PropTypes.object.isRequired,
}

export default Header;
