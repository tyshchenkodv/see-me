import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik } from 'formik';
import AddEditArticleForm from '../AddEditArticleForm';

function EditArticle ({updateArticle, article, history}) {
    const handleSubmit = async formData => {
        await updateArticle({formData});
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
                initialValues={{title: article?.title || '',
                    text: article?.text || '',
                    available: article?.available || ''}}
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

EditArticle.propTypes = {
    updateArticle: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default EditArticle;
