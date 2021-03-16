import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useStyles } from "./styles";
import { NavLink } from "react-router-dom";
import { typeOfArticlesListItem } from './propTypes';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditArticle from "../EditArticle/EditArticle";

function ArticlesListItem ({ article, updateArticle, history, setOpen, open }) {
    const classes = useStyles();
    const handleOpen = () => setOpen(true);

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
                                    <IconButton onClick={handleOpen} size="small" aria-label="edit">
                                        <EditIcon/>
                                    </IconButton>
                                </div>
                                <p className="post-meta">Posted by
                                    <NavLink exact
                                             to={'/users/' + article.userId}> {article.firstName} {article.secondName}</NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
            <EditArticle article={article}
                         updateArticle={updateArticle}
                         history={history}
                         setOpen={setOpen}
                         open={open}/>
        </>);
}

ArticlesListItem.propTypes = {
    article: typeOfArticlesListItem,
};

export default ArticlesListItem;
