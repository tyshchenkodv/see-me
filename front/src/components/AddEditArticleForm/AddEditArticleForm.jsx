import 'cropperjs/dist/cropper.css';

import {
    Button, DialogActions, Grid,
    MenuItem, Select,
} from '@material-ui/core';
import { Field, Form } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Cropper from 'react-cropper';

function AddEditArticleForm({
    errors, touched, handleCloseCancel, setFieldValue,
}) {
    const [image, setImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [cropper, setCropper] = useState();

    const handleChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (file.type.match('image.*') && file.size < 10000000) {
            const reader = new FileReader();

            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            console.log('ERROR!');
        }
    };

    const cropImage = () => {
        if (typeof cropper !== 'undefined') {
            setCroppedImage(cropper.getCroppedCanvas().toDataURL());
            croppedImage && setFieldValue('image', croppedImage);
        }
    };

    return (
        <Form>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="form-group">
                        <label>Article title</label>
                        <Field
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            aria-describedby="emailHelp"
                        />
                        {touched.title && errors.title ? (
                            <div className="alert alert-danger">{errors.title}</div>
                        ) : null}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="form-group">
                        <label>Article text</label>
                        <Field type="text" className="form-control" id="text" name="text" as="textarea" rows="5" />
                        {touched.text && errors.text ? (
                            <div className="alert alert-danger">{errors.text}</div>
                        ) : null}
                    </div>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                    <div>
                        {!croppedImage && (
                            <Button variant="contained" component="label">
                Upload Image
                                <Field onChange={handleChange} hidden type="file" name="image" />
                            </Button>
                        )}
                        {image && !croppedImage && <Cropper src={image} onInitialized={(instance) => setCropper(instance)} />}
                        {image && !croppedImage && <Button variant="contained" onClick={cropImage}>Crop!</Button>}
                        {croppedImage && <img src={croppedImage} alt="Cropped" />}
                    </div>
                </Grid>
            </Grid>
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
    handleCloseCancel: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
};

export default AddEditArticleForm;
