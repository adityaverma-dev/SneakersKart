import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorGlobal, successGlobal } from './notificationSlice';
import { getAuthHeader, removeTokenCookie, getTokenCookie } from "utils/tools";
axios.defaults.headers.post['Content-Type'] = 'application/json';

const initialState = {};


export const productsBySort = createAsyncThunk(
    'product/productsBySort',
    async ({ limit, sortBy, order }, { dispatch }) => {
        try {
            const products = await axios.get(`/api/products/all`, {
                params: {
                    limit,
                    sortBy,
                    order,
                }

            });

            return { sortBy, products: products.data };

        } catch (error) {
            dispatch(successGlobal("An error occurred while fetching products"));
            console.log(error)
        }
    }
);
export const productsByPaginate = createAsyncThunk(
    'product/productsByPaginate',
    async (args, { dispatch }) => {
        try {
            const products = await axios.post(`/api/products//paginate/all`, args);

            return products.data
          

        } catch (error) {
            dispatch(errorGlobal('An error occurred'))
    
        }
    }
)

export const productRemove = createAsyncThunk(
    'product/productRemove',
    async (id, { dispatch }) => {
        try {
         const products =  await axios.delete(`/api/products/product/${id}`, getAuthHeader());

         

         dispatch(successGlobal('Successfully Deleted'))

           
          

        } catch (error) {
            dispatch(errorGlobal('An error occurred'))
    
        }
    }
)

export const getProductByID = createAsyncThunk(
    'product/getProductByID',
    async (id, { dispatch }) => {
        try {
         const products =  await axios.get(`/api/products/product/${id}`);

         return products.data

        

           
          

        } catch (error) {
            dispatch(errorGlobal('An error occurred'))
    
        }
    }
)

export const productEdit = createAsyncThunk(
    'product/productEdit',
    async ({ id, values }, { dispatch }) => {
        try {
            const products = await axios.patch(`/api/products/product/${id}`, values, getAuthHeader());
            dispatch(successGlobal('Product successfully updated'));
            return products.data;
        } catch (error) {
            dispatch(errorGlobal('An error occurred'));
        }
    }
);





export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearCurrentState: () => {
            return initialState; // Resets the state to the initial state
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(productsBySort.fulfilled, (state, action) => {
                // Ensure action.payload is properly structured
                if (action.payload && action.payload.sortBy) {
                    if (action.payload.sortBy === 'available') {
                        state.bySold = action.payload.products;
                    } else if (action.payload.sortBy === 'price') {
                        state.byPrice = action.payload.products;
                     }
                }
            })
            .addCase(productsByPaginate.fulfilled, (state, action) => {
             state.byPaginate = action.payload;
            })
            .addCase(productRemove.fulfilled, (state, action) => {
                state.removedArticle = action.payload;
                state.removedArticle = true;
               })
            .addCase(getProductByID.fulfilled, (state, action) => {
                state.productByID = action.payload;
               
               })
            .addCase(productEdit.fulfilled, (state, action) => {
                state.productEdit = action.payload;
               
               })
    }
});

export const { clearCurrentState} = productSlice.actions;

export const selectProduct = (state) => state.product;
export default productSlice.reducer