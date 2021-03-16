import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik } from 'formik';
import AddEditArticleForm from '../AddEditArticleForm';
import {Dialog, DialogContent} from "@material-ui/core";

function EditArticle ({updateArticle, article, history, setOpen, open}) {

    const handleCloseCancel = () => {
        setOpen(false);
    };

    const handleCloseAdd = async formData => {
        await updateArticle({formData, id: article.id});
        setOpen(false);
        history.go(0);
        history.push('/articles');
    }

    const articleValidation = yup.object().shape({
        title: yup
            .string()
            .min(10, 'Too short')
            .max(300, 'Too loong').required('Required'),
        text: yup
            .string()
            .min(50, 'Too short')
            .max(5000, 'Too loong').required('Required'),
    });

    return (
        <div>
            <Dialog open={open}
                    onClose={handleCloseCancel}
                    aria-labelledby="form-dialog-title"
                    fullWidth>
                <DialogContent>
                    <Formik
                        initialValues={{title: article?.title || '',
                            text: article?.text || '',
                            available: article?.available || ''}}
                        onSubmit={handleCloseAdd}
                        validationSchema={articleValidation}
                    >
                        {({
                              errors,
                              touched,
                          }) => (
                            <AddEditArticleForm errors={errors}
                                                touched={touched}
                                                handleCloseCancel={handleCloseCancel}/>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
}

EditArticle.propTypes = {
    updateArticle: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default EditArticle;
