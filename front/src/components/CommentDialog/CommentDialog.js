import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core';
import {Form,Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';

import {getDateNowForDB} from '../../utils/formatDate';
import {commentValidationSchema} from './commentValidationSchema';
import {useStyles} from './styles';

function CommentDialog({openComment, setOpenComment, comment = undefined, userId, articleId, apiFunction, parentId = null}) {
    const classes = useStyles();

    const handleClose = () => {
        setOpenComment(false);
    };

    const handleCloseGo = useCallback(async (formData) => {
        formData.date = getDateNowForDB();
        formData.articleId = articleId;
        formData.userId = userId;
        formData.parentId = parentId;
        if (comment) {
            formData.id = comment.id;
        }
        await apiFunction(formData);
        handleClose();
    }, [apiFunction, articleId, comment, handleClose, parentId, userId]);

    return (
        <Dialog
            open={openComment}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Comment</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        text: comment?.text || '',
                    }}
                    validationSchema={commentValidationSchema}
                    onSubmit={handleCloseGo}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                    }) => (
                        <Form>
                            <TextField fullWidth
                                id="text"
                                name="text"
                                className={classes.comment}
                                value={values.text}
                                onChange={handleChange}
                                error={touched.text && Boolean(errors.text)}
                                helperText={touched.text && errors.text}/>
                            <DialogActions>
                                <Button type="submit" color="primary">
                                    Go!
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}

CommentDialog.defaultProps = {
    comment: undefined,
    parentId: null,
};

CommentDialog.propTypes = {
    openComment: PropTypes.bool.isRequired,
    setOpenComment: PropTypes.bool.isRequired,
    comment: PropTypes.object,
    userId: PropTypes.object.isRequired,
    articleId: PropTypes.object.isRequired,
    apiFunction: PropTypes.func.isRequired,
    parentId: PropTypes.number,
};

export default CommentDialog;
