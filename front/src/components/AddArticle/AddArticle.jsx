import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';

function AddArticle ({createArticle}) {
    const handleSubmit = async formData => {
        await createArticle(formData);
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
                    <Form>
                        <div className="form-group">
                            <label>Article title</label>
                            <Field type="text" className="form-control" id="title" name="title"
                                   aria-describedby="emailHelp"/>
                            {touched.title && errors.title ? (
                                <div className="alert alert-danger">{errors.title}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label>Article text</label>
                            <Field type="text" className="form-control" id="text" name="text"/>
                            {touched.text && errors.text ? (
                                <div className="alert alert-danger">{errors.text}</div>
                            ) : null}
                        </div>
                        <button type="submit" className="btn btn-primary">Create article</button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

AddArticle.propTypes = {
    createArticle: PropTypes.func.isRequired,
}

export default AddArticle;
