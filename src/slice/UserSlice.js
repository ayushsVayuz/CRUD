import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsersData, deleteUser, postUserData, getSpecificUserData, updateUserData } from "../actions/Action";
import { toast } from 'react-toastify';



// It defines the user slice, which contains actions and reducers for managing user's state
export const userSlice = createSlice({
    name: "userData",
    initialState :{ 
        loading:false,
        payload:null,
        usersData:[], 
        totalData:0
    } ,
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(fetchAllUsersData.pending, (state, action) =>{
            state.loading = true         
        })
        .addCase(fetchAllUsersData.fulfilled, (state, action) =>{
            state.usersData = action.payload.data,
            state.totalData = action.payload.totalData
            state.loading = false
        })
        .addCase(fetchAllUsersData.rejected, (state, action) =>{
            state.loading = false
        })
        .addCase(deleteUser.pending, (state, action) => {
            toast.pending("removing the user");
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.usersData = state.usersData.filter((user) => user._id !== action.payload);
            state.totalData -= 1
            toast.success("User removed")
        })
        .addCase(deleteUser.rejected, (state, action) => {
            toast.rejected("User can't be removed");
        
        })
        .addCase(postUserData.pending, (state, action) => {
            state.loading = true     
        })
        .addCase(postUserData.fulfilled, (state, action) => {
            state.usersData = [...state.usersData, action.payload.data]
            state.loading = false
            state.totalData += 1
        })
        .addCase(postUserData.rejected, (state, action) => {
            state.loading = false
        })
        .addCase(getSpecificUserData.pending, (state, action) => {
            state.loading = true  
        })
        .addCase(getSpecificUserData.fulfilled, (state, action) => {
            state.usersData = action.payload.data
            state.loading = false
        })
        .addCase(getSpecificUserData.rejected, (state, action) => {
            state.loading = false  
        })
        .addCase(updateUserData.pending, (state, action) => {
            state.loading = true
        })
        .addCase(updateUserData.fulfilled, (state, action) => {
            state.usersData = //?
            //i have an Array []
            //i have an object {}
            //find this object index from this array
            //replce the index object with new object
            state.loading = false
        })
        .addCase(updateUserData.rejected, (state, action) => {
            state.loading = true
        })


        
       
    }

})



export default userSlice.reducer;