import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, deleteUser } from "../actions/Action";

// It defines the user slice, which contains actions and reducers for managing user's state
export const userSlice = createSlice({
    name: "userData",
    initialState :{ 
        loading:false,
        payload:null,
        userData:[]
    } ,
    reducers: {
        fetchData : (state,action) => {
            state.payload = action.payload
        }
            
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchUserData.pending, (state, action) =>{
            
            state.loading = true         
        })
        .addCase(fetchUserData.fulfilled, (state, action) =>{
            console.log("check action", action);
            state.userData = action.payload.data,
            state.loading = false
        })
        .addCase(fetchUserData.rejected, (state, action) =>{
            state.loading = true
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.userData = state.userData.filter((user) => user._id !== action.payload);
        });
    }

})


export const {fetchData} = userSlice.actions
export default userSlice.reducer;