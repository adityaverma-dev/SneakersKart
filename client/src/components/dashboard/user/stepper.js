import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { errorHelper } from "utils/tools";
import Loader from "utils/loader";
import Modal from 'react-bootstrap/Modal';


import {
    TextField, Button, Stepper, Step, Stepl, StepLabel
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectNotification } from "store/features/notificationSlice";
import { updateUserEmail } from "store/features/userSlice";


const EmailStepper = ({ users }) => {
    const [loading, setLoading] = useState(false);
    const [emailmodal, setEmailModal] = useState(false);
    const notifications = useSelector(selectNotification)
    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Enter old email', 'Enter new email', 'Are your Sure']

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { email: '', newemail: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('This is required')
                .email('This is not a valid email')
                .test('match,', 'Please check your email.', (email) => {
                    return email === users.data.email;

                }),


            newemail: Yup.string()
                .required('This is required')
                .email('This is not a valid email')
                .test('match', 'please check your email', (newemail) => {
                    return newemail !== users.data.email;
                })


        }),
        onSubmit: (values) => {
            dispatch(updateUserEmail(values))

        }

    })

    const closeModal = () => {
        setEmailModal(false)
    }

    const openModal = () => {
        setEmailModal(true)
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    const handleback = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const nextBtn = () => (

        <Button className="mt-3" variant="contained" color="primary" onClick={handleNext}>
            Next
        </Button>
    );

    const backBtn = () => (
        <Button className="mt-3 ml-2" variant="contained" color="grey" onClick={handleback}>
            Back
        </Button>
    )
    return (
        <>

            <form className='mt-3 article_form' style={{ maxWidth: '250px' }}>
                <div className='form-group'>
                    <TextField
                        style={{ width: '100%' }}
                        name="emailstatic"
                        placeholder={users.data.email}

                        variant='outlined'
                        values={users.data.email}
                       disabled


                    />
                </div>
                <Button
                    className="mb-3"
                    variant="contained"
                    color="primary"
                    onClick={openModal}

                >
                    Edit email
                </Button>
            </form>
            <Modal size='lg' centered show={emailmodal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update your email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                    <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
                        {activeStep === 0 ?
                            <div className="form-group">
                                <TextField
                                    style={{ width: '100%' }}
                                    name="email"
                                    label="Enter your current email"

                                    variant='outlined'
                                    {...formik.getFieldProps('email')}
                                    {...errorHelper(formik, 'email')}
                                />
                                {
                                    formik.values.email && !formik.errors.email ?
                                        nextBtn()
                                        : null
                                }


                            </div>

                            : null}
                        {activeStep === 1 ?
                            <div className="form-group">
                                <TextField
                                    style={{ width: '100%' }}
                                    name="newemail"
                                    label="Enter your current email"

                                    variant='outlined'
                                    {...formik.getFieldProps('newemail')}
                                    {...errorHelper(formik, 'newemail')}
                                />
                                {
                                    formik.values.newemail && !formik.errors.newemail ?
                                        nextBtn()
                                        : null
                                }
                                {backBtn()}


                            </div>

                            : null}

                        {activeStep === 2 ?

                            <div className="form-group">
                                {loading ?
                                    <Loader />
                                    :
                                    <>
                                        <Button
                                            className="mb-3"
                                            variant="contained"
                                            color="primary"
                                            onClick={formik.submitForm}


                                        >
                                            Edit Email

                                        </Button>
                                    </>}
                                {backBtn()}


                            </div>



                            : null}
                    </form>
                </Modal.Body>

            </Modal>
        </>
    )


}
export default EmailStepper;