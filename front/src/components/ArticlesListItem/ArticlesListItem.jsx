import React, {useState} from 'react';
import { useStyles } from "./styles";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { typeOfArticlesListItem } from './propTypes';
import {
    IconButton,
    Menu,
    MenuItem,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    Button,
    Typography,
} from '@material-ui/core';
import clsx from "clsx";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentItem from '../CommentItem';
import {formatDate} from "../../utils/formatDate";

//TODO: edit/delete comments action
//TODO: reply comments

function ArticlesListItem ({ article, setSelectedArticle, deleteArticle, btnVisible }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <NavLink exact to={`/profiles/${article?.user.id}`}>
                            <Avatar aria-label="recipe"
                                    className={classes.avatar}
                                    src={`http://localhost:3333/users/avatar/${article?.user.avatar}`}/>
                        </NavLink>
                    }
                    action={
                        <IconButton onClick={handleClick}
                                    aria-label="settings"
                                    hidden={btnVisible}>
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={article?.user.firstName + ' ' + article?.user.secondName}
                    subheader={formatDate(article?.date)}
                />
                <CardContent>
                    <Typography variant="h4"
                                align="center"
                                color="textPrimary"
                                paragraph
                                component="p">
                        {article?.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {article?.text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon color={'error'}/>
                    </IconButton>
                    <Button
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        disabled={article?.comments.length === 0}
                        endIcon={<ExpandMoreIcon className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}/>}
                    >
                        Comments: {article?.commentsCount}
                    </Button>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                            {article?.comments.map((comment) =>
                                <CommentItem comment={comment}/>
                            )}
                    </CardContent>
                </Collapse>
            </Card>
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
        </>);
}

ArticlesListItem.propTypes = {
    article: typeOfArticlesListItem,
    setSelectedArticle: PropTypes.func.isRequired,
    deleteArticle: PropTypes.func.isRequired,
    btnVisible: PropTypes.bool.isRequired,
};

export default ArticlesListItem;
