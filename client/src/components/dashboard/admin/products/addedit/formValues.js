import * as Yup from 'yup'

export const  formValues = {
    model: '',
    brand:'',
    toptype:'',
    description:'',
    price:'',
    available:'',
    shipping: false,
    images:[]
}

export const getValuesToEdit = (product) => {
  return {
    model: product.model,
    brand: product.brand._id,
    toptype: product.toptype,
    description: product.description,
    price: product.price,
    available: product.available,
    shipping: product.shipping,
    images:product.images

  }
}

export const validation = () => (
  Yup.object({
    model: Yup.string()
    .required('Sorry Model is required'),
    brand:Yup.string()
    .required('Sorry the brand is required'),
    toptype: Yup.string()
    .required('Sorry Top type is required'),
    description: Yup.string()
    .required('Sorry Description is required'),
    price:Yup.number()
    .required('Sorry price is required')
    .min(1, 'sorry the min is 1')
    .max(100000, 'That is too expensive to be real'),
    available: Yup.number()
    .required('Do we have stock?'),
    shipping: Yup.boolean()
    .required('Do we offer shipping?'),
  })
)