import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

import { API_HOST } from '../../config/configData.json';
import {formatDate} from '../../utils/formatDate';
import CommentDialog from '../CommentDialog';
import CommentItem from '../CommentItem';
import { typeOfArticle } from './propTypes';
import { useStyles } from './styles';

function ArticlesListItem ({ article, setSelectedArticle, deleteArticle, btnVisible, userId, createComment, deleteComment, updateComment }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [openComment, setOpenComment] = useState(false);

    const handleOpenComment = () => {
        setOpenComment(true);
    };

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
                        <NavLink exact to={`/profiles/${ article?.user.id }`}>
                            <Avatar aria-label="recipe"
                                className={classes.avatar}
                                src={`${ API_HOST }/users/avatar/${ article?.user.avatar }`}/>
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
                    <Button
                        onClick={handleOpenComment}
                        endIcon={<CommentIcon/>}
                    >
                        Add comment
                    </Button>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {article?.comments.map((comment) =>
                            <CommentItem key={comment.id}
                                comment={comment}
                                articleId={article?.id}
                                createComment={createComment}
                                deleteComment={deleteComment}
                                updateComment={updateComment}/>
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
            <CommentDialog openComment={openComment}
                setOpenComment={setOpenComment}
                userId={userId}
                articleId={article?.id}
                apiFunction={createComment}/>
        </>);
}

ArticlesListItem.propTypes = {
    article: PropTypes.shape(
        PropTypes.arrayOf(
            typeOfArticle,
        ).isRequired,
    ).isRequired,
    setSelectedArticle: PropTypes.func.isRequired,
    deleteArticle: PropTypes.func.isRequired,
    btnVisible: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    createComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
};

export default ArticlesListItem;
