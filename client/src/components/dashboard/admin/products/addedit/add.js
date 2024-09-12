import DashboardLayout from "hoc/dashboardlayout";
import PicsUpload from "./upload";
import { useFormik } from "formik";
import { errorHelper } from 'utils/tools'
import Loader from "utils/loader";
import { useNavigate } from 'react-router-dom';
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
import { validation } from "./formValues";
import { formValues } from "./formValues";
import { getAllBrands, selectBrand } from "store/features/brandSlice";
import { ProductToAdd } from "store/features/productAdd";
import PicViewer from "./picViewer";



const AddProducts = (props) => {

    const [loading, setLoading] = useState(false)
    const notifications = useSelector(selectNotification)
    const dispatch = useDispatch();
    const brand = useSelector(selectBrand)
    const navigate = useNavigate();



    const formik = useFormik({
        initialValues: {
            model: '',
            brand: '',
            toptype: '',
            description: '',
            price: '',
            available: '',
            shipping: false,
            images: [],
        },
        validationSchema: validation(),
        onSubmit: (values) => {
            console.log(values)
            dispatch(ProductToAdd(values))
        }
    })

    const handlePicValue = (pic) => {
        const picArray = formik.values.images || [];
        picArray.push(pic.url)
        formik.setFieldValue('images', picArray)
    }
    const deletePic = (index) => {
        const picArray = [...(formik.values.images || [])];
        if (picArray.length > 0) {
            picArray.splice(index, 1); // Remove the image
            formik.setFieldValue('images', picArray); // Update formik with the new array
        }
    }

    useEffect(() => {
        if (notifications && notifications.success) {
            navigate('/dashboard/admin/admin_products');

        }
        if (notifications && notifications.error) {
            setLoading(false)

        }


    }, [notifications, props.history])




    useEffect(() => {
        dispatch(getAllBrands())
    }, [dispatch])

    console.log(formik.values)

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
                            Add Product




                        </Button>




                    </form>


                </>



            }

        </DashboardLayout>
    )



}

export default AddProducts;