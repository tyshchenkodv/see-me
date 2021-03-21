import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'formik';
import { Select, MenuItem, DialogActions, Button } from '@material-ui/core';

function AddEditArticleForm ({errors, touched, handleCloseCancel}) {
    return (
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
                <Field type="text" className="form-control" id="text" name="text" as="textarea" rows="5"/>
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
            <DialogActions>
                <Button onClick={handleCloseCancel} color="primary">
                    Cancel
                </Button>
                <Button type="submit" color="primary">
                    GO!
                </Button>
            </DialogActions>
        </Form>
    );
}

AddEditArticleForm.propTypes = {
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
}

export default AddEditArticleForm;
