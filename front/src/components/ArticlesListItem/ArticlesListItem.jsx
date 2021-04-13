import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { useStyles } from "./styles";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { typeOfArticlesListItem } from './propTypes';
import {IconButton, Menu, MenuItem} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

function ArticlesListItem ({ article, setSelectedArticle, deleteArticle, btnVisible }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseEdit = () => {
        setAnchorEl(null);
        setSelectedArticle(article);
    };

    const handleCloseDelete = () => {
        setAnchorEl(null);
        deleteArticle(article.id);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Paper className={(classes.paper)}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className="post-preview">
                                <div className="row">
                                    <NavLink className="col-9" exact to={'/articles/' + article.id}>
                                        <h2 className="post-title">
                                            {article.title}
                                        </h2>
                                    </NavLink>
                                    <IconButton onClick={handleClick}
                                                size="small"
                                                aria-label="edit"
                                                hidden={btnVisible}>
                                        <MoreVert/>
                                    </IconButton>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleCloseEdit}>Edit</MenuItem>
                                        <MenuItem onClick={handleCloseDelete}>Delete</MenuItem>
                                    </Menu>
                                </div>
                                <p className="post-meta">Posted by
                                    <NavLink exact
                                             to={'/profiles/' + article.userId}> {article.firstName} {article.secondName}</NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        </>);
}

ArticlesListItem.propTypes = {
    article: typeOfArticlesListItem,
    setSelectedArticle: PropTypes.func.isRequired,
    deleteArticle: PropTypes.func.isRequired,
    btnVisible: PropTypes.bool.isRequired,
};

export default ArticlesListItem;
