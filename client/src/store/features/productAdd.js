import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";
import { errorGlobal, successGlobal } from "./notificationSlice";
import { getAuthHeader } from "utils/tools";

const initialState = {};

export const ProductToAdd = createAsyncThunk(
    'brand/ProductToAdd',
    async (values,  {dispatch}) => {
        try {
            const productsAdd = await axios.post(`/api/products`, values, getAuthHeader())


           
         
            dispatch(successGlobal('Product has been added'))
            return productsAdd.data
            
        } catch (error) {
          
            dispatch(errorGlobal('An unwanted error has occured'))
            if (error.response && error.response.data) {
                console.error('Server Response:', error.response.data);
            }
            throw error;
            
        }
    }
);



export const productAddSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearNotification: () => {
            return initialState; // Resets the state to the initial state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(ProductToAdd.fulfilled, (state, action) => {
              state.data = action.payload;
            })

        }  
    })       



export const { clearNotification } = productAddSlice.actions;

export const selectProductAdd = (state) => state.product;
export default productAddSlice.reducer