import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";
import { errorGlobal } from "./notificationSlice";


export const getAllBrands = createAsyncThunk(
    'brand/getAllBrands',
    async (_,  {dispatch}) => {
        try {
            const brands = await axios.get(`/api/brands/all`)
         
            return brands.data
            
        } catch (error) {
          
            dispatch(errorGlobal('An unwanted error has occured'))
            throw error;
            
        }
    }
);

export const brandSlice = createSlice({
    name: 'brand',
    initialState : {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBrands.fulfilled, (state, action) => {
                console.log('Brands fetched:', action.payload);
              state.data = action.payload;
            })

        }  
    })       
    


export const selectBrand = (state) => state.brand;
export default brandSlice.reducer