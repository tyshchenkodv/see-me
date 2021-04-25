import {
    Dialog,
    DialogContent,
} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as yup from 'yup';

import AddEditArticleForm from '../AddEditArticleForm';

function AddArticle({
    createArticle, history, setOpen, open,
}) {
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

    const handleCloseCancel = () => {
        setOpen(false);
    };

    const handleCloseAdd = async (formData) => {
        await createArticle(formData);
        setOpen(false);
        history.go(0);
        history.push('/');
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleCloseCancel}
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogContent>
                    <Formik
                        initialValues={{
                            title: '',
                            text: '',
                            available: '',
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
                            <AddEditArticleForm
                                errors={errors}
                                touched={touched}
                                handleCloseCancel={handleCloseCancel}
                                setFieldValue={setFieldValue}
                            />
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
}

AddArticle.propTypes = {
    createArticle: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default AddArticle;
