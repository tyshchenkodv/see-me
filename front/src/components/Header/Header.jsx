import { AppBar, Button,Toolbar, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useCallback,useState} from 'react';
import {useMutation} from 'react-query';
import { NavLink } from 'react-router-dom';

import useArticles from '../../hooks/useArticles';
import ApiCallsAddArticlePage from '../../pages/AddArticlePage/apiCalls';
import AddArticle from '../AddArticle';
import UserDropdown from '../UserDropdown/UserDropdown';
import { useStyles } from './styles';

function Header ({ history, user, logout }) {
    const classes = useStyles();
    const { refetchArticles } = useArticles();
    const {createArticleRequest} = ApiCallsAddArticlePage();
    const [open, setOpen] = useState(false);
    const {mutate: createArticle} = useMutation(createArticleRequest);
    const tokenString = localStorage.getItem('token') || null;
    const token = JSON.parse(tokenString);

    const onCreateArticle = useCallback(async (formData) => {
        try {
            await createArticle({token, formData});
            refetchArticles();
        } catch (error) {
            console.log(error);
        }
    }, [createArticle, token, refetchArticles]);

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
        <UserDropdown history={history} user={user} logout={logout}/>
    </>;

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
                {token ? authButtons : nonAuthButtons}
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    logout:PropTypes.func.isRequired,
};

export default Header;
