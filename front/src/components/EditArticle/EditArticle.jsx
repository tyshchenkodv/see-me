import {Dialog, DialogContent} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as yup from 'yup';

import AddEditArticleForm from '../AddEditArticleForm';

function EditArticle ({updateArticle, history, setSelectedArticle, selectedArticle}) {
    const handleCloseCancel = () => {
        setSelectedArticle(false);
    };

    const handleCloseAdd = async (formData) => {
        await updateArticle({formData, id: selectedArticle.id});
        setSelectedArticle(false);
        history.go(0);
        history.push('/articles');
    };

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
            <Dialog open={Boolean(selectedArticle)}
                onClose={handleCloseCancel}
                aria-labelledby="form-dialog-title"
                fullWidth>
                <DialogContent>
                    <Formik
                        initialValues={{title: selectedArticle?.title || '',
                            text: selectedArticle?.text || '',
                            available: selectedArticle?.available || '',
                            image: undefined,
                        }}
                        onSubmit={handleCloseAdd}
                        validationSchema={articleValidation}
                    >
                        {({
                            errors,
                            touched,
                            setFieldValue,
                        }) => (
                            <AddEditArticleForm errors={errors}
                                touched={touched}
                                setFieldValue={setFieldValue}
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
    history: PropTypes.object.isRequired,
    setSelectedArticle: PropTypes.func.isRequired,
    selectedArticle: PropTypes.object.isRequired,
};

export default EditArticle;
