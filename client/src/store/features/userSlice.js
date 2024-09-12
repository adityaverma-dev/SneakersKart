import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorGlobal, successGlobal } from "./notificationSlice";
import { getAuthHeader, removeTokenCookie, getTokenCookie } from "utils/tools";
import { siteGetVars } from "./siteSlice";
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const userRegister = createAsyncThunk(
    'user/userRegister',
    async (values, { dispatch }) => { // Added the slice name as the first argument
        try {
            const response = await axios.post(`/api/auth/register`, {
                email: values.email,
                password: values.password
            });

            dispatch(successGlobal('Welcome !! Check your mail to verify your account'));

         return response.data; // Return the user data received from the backend

        } catch (error) {
            dispatch(errorGlobal('Authentication Failed!'));
            throw error; // Rethrow the error to trigger the rejected action in the slice
        }
    }
);

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (values, { dispatch }) => { // Added the slice name as the first argument
        try {
            const response = await axios.post(`/api/auth/signin`, {
                email: values.email,
                password: values.password
            });

            dispatch(successGlobal('Welcome Back'));

            return response.data.user;  // Return the user data received from the backend

        } catch (error) {
            dispatch(errorGlobal('Enter correct details'));
        }
    }
);

export const userisAuth = createAsyncThunk(
    'user/userisAuth',
    async (_, {dispatch}) => {
        try {
dispatch(siteGetVars())

            if (!getTokenCookie()) {
                throw new Error();
            }
            const response = await axios.get(`/api/auth/isauth`, getAuthHeader());
            return response.data; 




        } catch (error) {
            throw error;
        }
    }
);
export const userSignOut = createAsyncThunk(
    'user/userSignOut',
    async (_, {dispatch}) => {
        try {
            removeTokenCookie();
            dispatch(successGlobal('You are Logged Out!'));
        
        } catch (error) {
            throw error;
        }
    }
);

export const updateUserInfo = createAsyncThunk(
    'user/updateUserInfo',
    async (values, { dispatch }) => {
        try {
            const response = await axios.patch(`/api/users/profile`, {
                data:{
                firstname: values.firstname,
                lastname:  values.lastname
            }
            }, getAuthHeader());
            dispatch(successGlobal('Your Profile has been updated'));

         return response.data; // Return the user data received from the backend

        } catch (error) {
            dispatch(errorGlobal('Authentication Failed!'));
            throw error; // Rethrow the error to trigger the rejected action in the slice
        }
    }
);
export const updateUserEmail = createAsyncThunk(
    'user/updateUserEmail',
    async (values, { dispatch }) => {
        try {
            const response = await axios.patch(`/api/users/profile`, {
                data:{
                email: values.newemail
            }
            }, getAuthHeader());
            dispatch(successGlobal('Your Profile has been updated'));

         return response.data; 

        } catch (error) {
            dispatch(errorGlobal('Authentication Failed!'));
            throw error; 
        }
    }
);

export const userAddToCart = createAsyncThunk(
    'user/userAddToCart',
    async (item, { getState, dispatch }) => {
        try {
            const cart= getState().user.cart;
            const updatedCart = [...cart, { ...item}]

            dispatch(successGlobal('Item added to cart successfully'))
            return updatedCart
            

        } catch (error) {
            dispatch(errorGlobal('Authentication Failed!'));
            throw error; 
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'user/removeFromCart',
    async (position, { getState, dispatch }) => {
        try {
            const cart= getState().user.cart;
            
                const updatedCart = [...cart]; // Clone the cart array
                updatedCart.splice(position, 1); // Remove the item
                dispatch(successGlobal('Product removed successfully'));
                return updatedCart;
           
            

        } catch (error) {
            console.error('Error details:', error); // Log error details
            dispatch(errorGlobal('Unable to remove'));
            throw error; 
        }
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {
            _id: null,
            email: null,
            firstname: null,
            lastname: null,
            history: [],
            verified: null
        },
        auth: null,
        cart: []
    },
    reducers: {
        signout: (state) => {
            state.data = {};
            state.auth = false;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(userRegister.fulfilled, (state, action) => {
                state.data = action.payload;
                state.auth = true;

            })
            .addCase(userLogin.fulfilled, (state, action) => {
                if (action.payload) {
                    state.data = action.payload;
                    state.auth = true;
                }

            })
            .addCase(userisAuth.fulfilled, (state, action) => {

                state.data = action.payload;
                state.auth = true;


            })
            .addCase(userisAuth.rejected, (state, action) => { 
           
                state.data = {};
                state.auth= false;
                    
         
        })
            .addCase(userSignOut.fulfilled, (state) => {
                state.data = {};
                state.auth = false;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.data = action.payload;
                state.auth = true;

            })
            .addCase(userAddToCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.auth = true;

            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.auth = true;

            })
    }

});

export const {signout} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;