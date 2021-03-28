import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Field, Formik, Form } from 'formik';
import {Grid, Button, IconButton} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Cropper from "react-cropper";

function EditProfile ({user, setUser}) {
    const [image, setImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [cropper, setCropper] = useState();

    const handleChange = e => {
        e.preventDefault();
        const file = e.target.files[0];
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
        }
    };

    const handleSubmit = formData => {
        setUser({...formData, avatar: croppedImage});
    }

    return (
        <Formik
            initialValues={{
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
                university: user?.university || '',
            }}
            onSubmit={handleSubmit}
        >
            {({
                  errors,
                  touched,
              }) => (
                <Form>
                    <Grid alignItems='center' container spacing={3}>
                        <Grid item xs={12}>
                            <h4>My Profile</h4>
                        </Grid>

                        <Grid item xs={9}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <Field type="text" className="form-control" id="name" name="name"
                                               aria-describedby="name"/>
                                        {touched.name && errors.name ? (
                                            <div className="alert alert-danger">{errors.name}</div>
                                        ) : null}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <Field type="email" className="form-control" id="email" name="email"
                                               aria-describedby="email"/>
                                        {touched.email && errors.email ? (
                                            <div className="alert alert-danger">{errors.email}</div>
                                        ) : null}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <Field type="text" className="form-control" id="phone" name="phone"
                                               aria-describedby="phone"/>
                                        {touched.phone && errors.phone ? (
                                            <div className="alert alert-danger">{errors.phone}</div>
                                        ) : null}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="form-group">
                                        <label>University</label>
                                        <Field type="text" className="form-control" id="university" name="university"
                                               aria-describedby="university"/>
                                        {touched.university && errors.university ? (
                                            <div className="alert alert-danger">{errors.university}</div>
                                        ) : null}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={3}>
                            <div>
                                {!user.avatar && !croppedImage && !image &&
                                <IconButton variant="contained" component="label">
                                    <AccountCircle/>
                                    <Field onChange={handleChange} hidden type="file" name="image"/>
                                </IconButton>}
                                {image && !croppedImage &&
                                <Cropper src={image} onInitialized={instance => setCropper(instance)}/>}
                                {image && !croppedImage &&
                                <Button variant="contained" onClick={cropImage}>Crop!</Button>}
                                {croppedImage && <img src={croppedImage} alt='user'/>}
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

EditProfile.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
};

export default EditProfile;
