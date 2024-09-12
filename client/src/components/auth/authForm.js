import React, { useEffect, useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Loader from "utils/loader";
import { errorHelper } from "utils/tools";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import { userLogin, userRegister } from "store/features/userSlice";
import { selectNotification } from "store/features/notificationSlice";


const AuthForm = (props) => {
    const notifications = useSelector(selectNotification)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry the email is reauired')
                .email('This is an invalid email'),
            password: Yup.string()
                .required('Sorry the password is required')


        }),
        onSubmit: (values) => {
            setLoading(true);
            handleSubmit(values)
        }


    })

    const handleSubmit = (values) => {
        if (props.formType) {
            dispatch(userRegister(values))

        }
        else {
            dispatch(userLogin(values))
        }


    }

    useEffect(() => {

        if (notifications && notifications.success) {
            navigate('/dashboard');

        } else {
            setLoading(false)
        }

    }, [notifications, navigate])

    return (

        <>
            <div className="auth_container">
                {loading ?
                    <Loader />
                    :
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="email"
                                label="Enter your email"
                                variant="outlined"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik, 'email')}
                            />

                        </div>
                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="password"
                                label="Enter your password"
                                variant="outlined"
                                type="password"
                                {...formik.getFieldProps('password')}
                                {...errorHelper(formik, 'password')}
                            />

                        </div>
                        <Button
                            variant="contained"
                            size="small"
                            type="submit"

                        >
                            {props.formType ? 'Register' : 'Login'}
                        </Button>

                    </form>

                }


            </div>
        </>


    )



}
export default AuthForm;