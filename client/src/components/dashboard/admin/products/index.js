import React, { useEffect, useReducer, useState } from "react";
import DashboardLayout from "hoc/dashboardlayout";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/features/userSlice";
import { selectNotification } from "store/features/notificationSlice";
import { productRemove, productsByPaginate, selectProduct } from "store/features/productSlice";
import ProductsTable from "./productsTable";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools'
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

const defaultValue =  { keywords: '', brand:[], min:0, max:100000, page:1}

const AdminProduct = (props) => {
    const [removeModal, setRemoveModal] = useState(false);
    const [toRemove, setToRemove] = useState(null)
    const navigate = useNavigate()
    const products = useSelector(selectProduct)
    const notifications = useSelector(selectNotification)
    const dispatch = useDispatch();

    const [searchValues, setSearchValues] = useReducer(
(state, newState) => ({...state, ...newState}),
defaultValue

    )

    const formik = useFormik({
        initialValues: { keywords: '' },
        validationSchema: Yup.object({
            keywords: Yup.string()
            .min(3, 'you need more than 3')
            .max(200, 'your search is too long')

        }),
        onSubmit:(values, { resetForm }) => {
            setSearchValues({keywords: values.keywords, page:1})
            resetForm();
        }
    })


    const gotoEdit = (id) => {
     navigate(`/dashboard/admin/edit_product/${id}`)
    }

    const gotoPage = (page) => {
        setSearchValues({page:page})
    }

    const handleClose= () => {
        setRemoveModal(false)
    }
    
    const handleModal = (id) => {
        setToRemove(id);
        setRemoveModal(true)
        
    }

    const handleRemove = () => {
        dispatch(productRemove(toRemove))
    }

    const resetSearch = () => {
        setSearchValues(defaultValue)
    }

  useEffect(() => {
    dispatch(productsByPaginate(searchValues))

  }, [dispatch, searchValues])  

  useEffect(() => {
    handleClose();
    setRemoveModal(null)

    if(notifications && notifications.removedArticle){
        dispatch(productsByPaginate(searchValues))


    }

  }, [notifications, dispatch])

    return(
<DashboardLayout title="products">
<div className="products_table">
    <div>
       <form className="mt-3" onSubmit={formik.handleSubmit}>
        <TextField 
        style={{width: '100%'}}
        name = "keywords"
        label= "enter your search"
        variant="outlined"
        {...formik.getFieldProps('keywords')}
        {...errorHelper(formik, 'keywords')}
        
        
        />
        
        
        </form>
        <Button onClick={() => resetSearch()}>
            Reset

        </Button>
    </div>
    <hr/>
    <ProductsTable 
    removeModal={removeModal}
    prods={products.byPaginate}
    prev={(page) => gotoPage(page)}
    next={(page) => gotoPage(page)}
    gotoEdit = {(id) => gotoEdit(id) }
    handleClose={()=> handleClose()}
    handleModal = {(id) => handleModal(id) }
    handleRemove = {() => handleRemove() }
    
    />

</div>


</DashboardLayout>
    )
}

export default AdminProduct;