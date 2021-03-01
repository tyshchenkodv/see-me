import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useStyles } from "./styles";
import { NavLink } from "react-router-dom";
import { typeOfArticlesListItem } from './propTypes';

function ArticlesListItem ({ article }) {
    const classes = useStyles();

    return <Paper className={(classes.paper)}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="post-preview">
                            <NavLink exact to={'/articles/'+article.id}>
                                <h2 className="post-title">
                                    {article.title}
                                </h2>
                            </NavLink>
                            <p className="post-meta">Posted by
                                <NavLink exact to={'/users/'+article.userId}> {article.firstName} {article.secondName}</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
}

ArticlesListItem.propTypes = {
    article: typeOfArticlesListItem,
};

export default ArticlesListItem;
