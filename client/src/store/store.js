import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice';
import productReducer from './features/productSlice';
import notificationReducer from './features/notificationSlice';
import brandReducer from './features/brandSlice';
import productAddReducer from './features/productAdd';
import siteSliceReducer from './features/siteSlice'


export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    notification: notificationReducer,
    brand: brandReducer,
    productAdd: productAddReducer,
    site: siteSliceReducer

  },
})