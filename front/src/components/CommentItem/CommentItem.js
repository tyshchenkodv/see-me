import React, {useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton, Menu,
    MenuItem,
    Typography
} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentIcon from "@material-ui/icons/Comment";
import { useStyles } from "./styles";
import useAuth from "../../hooks/useAuth";
import {formatDate} from "../../utils/formatDate";
import PropTypes from 'prop-types';
import CommentDialog from "../CommentDialog";

function CommentItem({comment, articleId, createComment, deleteComment, updateComment}) {
    const classes = useStyles();
    const { user } = useAuth();
    const [openCommentEdit, setOpenCommentEdit] = useState(false);
    const [openCommentReply, setOpenCommentReply] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickReply = () => {
        setOpenCommentReply(true);
    }

    const handleCloseEdit = () => {
        setAnchorEl(null);
        setOpenCommentEdit(true);
    };

    const handleCloseDelete = () => {
        setAnchorEl(null);
        deleteComment(comment?.id);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <NavLink exact to={`/profiles/${comment?.user.id}`}>
                            <Avatar aria-label="recipe"
                                    className={classes.avatar}
                                    src={`http://localhost:3333/users/avatar/${comment?.user.avatar}`}/>
                        </NavLink>
                    }
                    action={
                        <IconButton onClick={handleClick}
                                        aria-label="settings"
                                        hidden={comment.user.id !== user?.id}>
                            <MoreVertIcon/>
                        </IconButton>}
                    title={comment?.user.firstName + ' ' + comment?.user.secondName}
                    subheader={formatDate(comment?.date)}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {comment?.text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button
                        startIcon={<CommentIcon/>}
                        onClick={handleClickReply}
                    >
                        Reply
                    </Button>
                </CardActions>
                <CardContent>
                    { comment?.items.length !== 0 && (
                        comment?.items.map((item) =>
                            <CommentItem comment={item}
                                         articleId={articleId}
                                         createComment={createComment}
                                         deleteComment={deleteComment}
                                         updateComment={updateComment}/>
                        )
                    )}
                </CardContent>
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
            <CommentDialog openComment={openCommentEdit}
                           setOpenComment={setOpenCommentEdit}
                           comment={comment}
                           userId={user?.id}
                           articleId={articleId}
                           apiFunction={updateComment}/>
            <CommentDialog openComment={openCommentReply}
                           setOpenComment={setOpenCommentReply}
                           userId={user?.id}
                           articleId={articleId}
                           apiFunction={createComment}
                           parentId={comment?.id}/>
        </>
    );
}

CommentItem.propTypes = {
    comment: PropTypes.shape({
       id: PropTypes.number.isRequired,
       text: PropTypes.string.isRequired,
       date: PropTypes.string.isRequired,
       user: PropTypes.object.isRequired,
       items: PropTypes.array,
    }),
    articleId: PropTypes.number,
    createComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    updateComment:PropTypes.func.isRequired,
};

export default CommentItem;
