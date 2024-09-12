import React from "react";
import DashboardLayout from "hoc/dashboardlayout";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { errorHelper } from 'utils/tools';

import {
TextField,
Button

} from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { selectSite, updateSiteVars } from "store/features/siteSlice";

const SiteVars = () => {
    const dispatch = useDispatch()
const site = useSelector(selectSite);
console.log(site)

const formik = useFormik({
    initialValues:{
        address: site.vars.address,
        phone: site.vars.phone,
        hours: site.vars.hours,
        email: site.vars.email
    },
    validationSchema: Yup.object({
        address: Yup.string()
        .min(3, 'you need to add more')
        .required('This is required'),
        phone: Yup.string()
        .max(15, 'you need to add more')
        .required('This is required'),
        hours: Yup.string()
        .max(100, 'you need to add more')
        .required('This is required'),
        email: Yup.string()
        .email('You need to add a valid email')
        .required('This is required'),
    }),
    onSubmit:(values) => {
        dispatch(updateSiteVars({
            _id: site.vars._id,
            ...values
        }))

    }
})

    return (
        <>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <TextField 
                style={{width: '100%'}}
                name="address"
                label="Enter the store Address"
                variant="outlined"
                {...formik.getFieldProps('address')}
                {...errorHelper(formik, 'address')}
                />

            </div>
            <div className="form-group">
                <TextField 
                style={{width: '100%'}}
                name="phone"
                label="Enter the phone"
                variant="outlined"
                {...formik.getFieldProps('phone')}
                {...errorHelper(formik, 'phone')}
                />

            </div>
            <div className="form-group">
                <TextField 
                style={{width: '100%'}}
                name="hours"
                label="Enter the hours"
                variant="outlined"
                {...formik.getFieldProps('hours')}
                {...errorHelper(formik, 'hours')}
                />

            </div>
            <div className="form-group">
                <TextField 
                style={{width: '100%'}}
                name="email"
                label="Enter the email"
                variant="outlined"
                {...formik.getFieldProps('email')}
                {...errorHelper(formik, 'email')}
                />

            </div>
       
<Button
variant="contained"
color="primary"
type="submit"

>
    Edit Store information
</Button>
        </form>
        </>
    )

}


export default SiteVars;

