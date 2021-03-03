import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
                        <Field name="available">
                            {({
                                  field,
                              }) => (
                                <div className="form-group">
                                    <label>Available to</label>
                                    <Select {...field} className="ml-3">
                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="friends">Friends</MenuItem>
                                        <MenuItem value="private">Only me</MenuItem>
                                    </Select>
                                </div>
                            )}
                        </Field>
                        <button type="submit" className="btn btn-primary">Update article</button>
                    </Form>
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
