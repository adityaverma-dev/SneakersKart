import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeader } from "utils/tools";
import { successGlobal } from "./notificationSlice";


export const siteGetVars = createAsyncThunk(
    'site/siteGetVars',
    async(vars) => {
        try {
const site = await axios.get(`/api/site`)
return site.data;

    }

catch(error){
    throw error;
}

}   
)

export const updateSiteVars = createAsyncThunk(
    'site/updateSiteVars',
    async(vars, {dispatch}) => {
        try {
const site = await axios.patch(`/api/site`, vars, getAuthHeader())
dispatch(successGlobal("Site vars updated successfully"))
return site.data;

    }

catch(error){
    throw error;
}

}   
)

export const siteSlice = createSlice({
    name: 'site',
    initialState: {
        vars: {
            _id: " ",
            address: " ",
            hours : " ",
            phone : " ",
            email: " "
        }
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(siteGetVars.fulfilled, (state, action)=> {
            state.vars = action.payload

        })
        .addCase(updateSiteVars.fulfilled, (state, action)=> {
            state.vars = action.payload

        })

    }
    
});



export const selectSite = (state) => state.site;

export default siteSlice.reducer;