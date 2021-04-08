import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { Field, Formik, Form } from 'formik';
import {Grid, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useStyles } from './styles';

function EditProfile ({user, editUser, updateAvatar, disabled}) {
    const [image, setImage] = useState();
    const [open, setOpen] = useState(false);
    const cropperRef = useRef(null);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setImage(null);
    };

    const handleChange = async e => {
        handleClickOpen();
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

    const cropImage = async () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        const blob = await fetch(cropper.getCroppedCanvas().toDataURL()).then((res) => res.blob());
        const formData = new FormData();
        formData.append("avatar", blob);

        await updateAvatar(formData, user.id);

        handleClose();
    };

    const handleSubmit = async formData => {
        await editUser({user: formData, id: user.id});
    };

    return (
        <>
            <h4>My Profile</h4>
            <div className={classes.root}>
                <Formik
                    initialValues={{
                        firstName: user?.firstName || '',
                        secondName: user?.secondName || '',
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
                        <Form className={classes.form}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <div className="form-group">
                                        <label>First name</label>
                                        <Field type="text" className="form-control" id="firstName" name="firstName"
                                               aria-describedby="firstName" disabled={disabled}/>
                                        {touched.firstName && errors.firstName ? (
                                            <div className="alert alert-danger">{errors.firstName}</div>
                                        ) : null}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="form-group">
                                        <label>Second name</label>
                                        <Field type="text" className="form-control" id="secondName" name="secondName"
                                               aria-describedby="secondName" disabled={disabled}/>
                                        {touched.secondName && errors.secondName ? (
                                            <div className="alert alert-danger">{errors.secondName}</div>
                                        ) : null}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <Field type="email" className="form-control" id="email" name="email"
                                               aria-describedby="email" disabled={disabled}/>
                                        {touched.email && errors.email ? (
                                            <div className="alert alert-danger">{errors.email}</div>
                                        ) : null}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <Field type="text" className="form-control" id="phone" name="phone"
                                               aria-describedby="phone" disabled={disabled}/>
                                        {touched.phone && errors.phone ? (
                                            <div className="alert alert-danger">{errors.phone}</div>
                                        ) : null}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="form-group">
                                        <label>University</label>
                                        <Field type="text" className="form-control" id="university" name="university"
                                               aria-describedby="university" disabled={disabled}/>
                                        {touched.university && errors.university ? (
                                            <div className="alert alert-danger">{errors.university}</div>
                                        ) : null}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" color="primary" hidden={disabled}>
                                    Save
                                </Button>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                <div className={classes.avatar}>
                    <Button component="label" disabled={disabled}>
                            <Avatar alt={user?.secondName}
                                    src={`http://localhost:3333/users/avatar/${user?.avatar}`}
                                    className={classes.avatarPhoto}/>
                        <input onChange={handleChange} hidden type="file" name="image"/>
                    </Button>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Upload your new avatar</DialogTitle>
                <DialogContent>
                    {image &&
                    <Cropper ref={cropperRef} src={image} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {image &&
                    <Button color="primary" autoFocus onClick={cropImage}>Crop!</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
}

EditProfile.propTypes = {
    user: PropTypes.object.isRequired,
    editUser: PropTypes.func.isRequired,
    updateAvatar: PropTypes.func.isRequired,
};

export default EditProfile;
