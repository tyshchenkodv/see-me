import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik } from 'formik';
import AddEditArticleForm from '../AddEditArticleForm';

function AddArticle ({createArticle, history}) {
    const handleSubmit = async formData => {
        await createArticle(formData);
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
        <>
            <Formik
                initialValues={{title: '', text: ''}}
                onSubmit={handleSubmit}
                validationSchema={articleValidation}
            >
                {({
                      errors,
                      touched,
                  }) => (
                    <AddEditArticleForm errors={errors}
                                        touched={touched}/>
                )}
            </Formik>
        </>
    );
}

AddArticle.propTypes = {
    createArticle: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
}

export default AddArticle;
