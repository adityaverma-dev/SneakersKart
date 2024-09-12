import DashboardLayout from "hoc/dashboardlayout";
import PicsUpload from "./upload";
import { useFormik } from "formik";
import { errorHelper } from 'utils/tools'
import Loader from "utils/loader";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
    TextField,
    Button,
    Divider,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
} from "@mui/material";
import { useEffect, useState } from "react";
import { selectNotification } from "store/features/notificationSlice";
import { validation, formValues, getValuesToEdit } from "./formValues";

import { getAllBrands, selectBrand } from "store/features/brandSlice";
import { ProductToAdd } from "store/features/productAdd";
import PicViewer from "./picViewer";
import { getProductByID, productEdit, selectProduct } from "store/features/productSlice";



const AddProducts = (props) => {
    const [values, setValues] = useState(formValues)
    const products = useSelector(selectProduct)

    const [loading, setLoading] = useState(false)
    const notifications = useSelector(selectNotification)
    const dispatch = useDispatch();
    const brand = useSelector(selectBrand)
    const navigate = useNavigate();
    const { id } = useParams();
    



    const formik = useFormik({
        enableReinitialize: true,
        initialValues:values,
        validationSchema: validation(),
        onSubmit: (values) => {
            console.log(values)
            dispatch(productEdit({ id, values }));
        }
    })

    const handlePicValue = (pic) => {
        const picArray = [...(formik.values.images || [])]; // Shallow clone the array
        picArray.push(pic.url); // Add the new image
        formik.setFieldValue('images', picArray); // Update the formik field
    };
    
    const deletePic = (index) => {
        const picArray = [...(formik.values.images || [])]; // Shallow clone the array
        picArray.splice(index, 1); // Remove the image at the index
        formik.setFieldValue('images', picArray); // Update the formik field
    };

    useEffect(() => {
        if (notifications) {
            setLoading(false)

        }

    }, [notifications, navigate])




    useEffect(() => {
 
        if (id) {
            dispatch(getProductByID(id));
        }
        dispatch(getAllBrands())
    }, [dispatch, id])

    useEffect(() => {
        if(products && products.productByID){
            setValues(getValuesToEdit(products.productByID))

        }
    }, [products])
    
  


    return (
        <DashboardLayout title="Add Product">
            {loading ?

                <Loader />

                :
                <>
                    <PicViewer
                        formik={formik}
                        deletePic={(index) => deletePic(index)}
                    />
                    <PicsUpload
                        picValue={(pic) => handlePicValue(pic)}


                    />

                    <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="model"
                                label="Enter a model"
                                variant="outlined"
                                {...formik.getFieldProps('model')}
                                {...errorHelper(formik, 'model')}

                            />

                        </div>

                        <div className="form-group">
                            <FormControl variant="outlined">
                                <h5>Select a brand</h5>
                                <Select name="brand"
                                    {...formik.getFieldProps('brand')}
                                    error={formik.errors.brand && formik.touched.brand ? true : false}

                                >

                                    <MenuItem value=''>
                                        <em>None</em>
                                    </MenuItem>
                                    {brand && brand.data ?
                                        brand.data.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        ))

                                        : null}

                                </Select>
                                {formik.errors.brand && formik.touched.brand ?
                                    <FormHelperText error={true}>
                                        {formik.errors.brand}

                                    </FormHelperText> : null}


                            </FormControl>

                        </div>

                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="toptype"
                                label="Enter Top Type"
                                variant="outlined"
                                {...formik.getFieldProps('toptype')}
                                {...errorHelper(formik, 'toptype')}

                            />

                        </div>

                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="description"
                                label="Enter description of product"
                                variant="outlined"
                                {...formik.getFieldProps('description')}
                                {...errorHelper(formik, 'description')}
                                multiline
                                rows={4}

                            />

                        </div>

                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="price"
                                label="Enter price"
                                variant="outlined"
                                type="number"
                                {...formik.getFieldProps('price')}
                                {...errorHelper(formik, 'price')}

                            />

                        </div>

                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="available"
                                label="How many units available"
                                type="number"
                                variant="outlined"
                                {...formik.getFieldProps('available')}
                                {...errorHelper(formik, 'available')}

                            />

                        </div>

                        <Divider className="mt-3 mb-3" />

                        <div className="form-group">
                            <FormControl variant="outlined">
                                <h5>Do we offer Free Shipping</h5>
                                <Select name="shipping"
                                    {...formik.getFieldProps('shipping')}
                                    error={formik.errors.shipping && formik.touched.shipping ? true : false}

                                >

                                    <MenuItem value={true}> Yes </MenuItem>
                                    <MenuItem value={false}> No </MenuItem>
                                </Select>
                                {formik.errors.shipping && formik.touched.shipping ?
                                    <FormHelperText error={true}>
                                        {formik.errors.shipping}

                                    </FormHelperText> : null}


                            </FormControl>

                        </div>

                        <Divider className="mt-3 mb-3" />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Edit Product




                        </Button>




                    </form>


                </>



            }

        </DashboardLayout>
    )



}

export default AddProducts;