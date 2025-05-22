import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser, registerUser, fetchAllUsersData, deleteUser, postUserData, getSpecificUserData, updateUserData } from "../actions/Action";
import { toast } from 'react-toastify';

/**
 * Defines the user slice containing actions and reducers for managing user state.
 * 
 * @return {Object} A Redux slice with initial state, reducers, and extra async reducers.
 */
export const userSlice = createSlice({
    name: "userData",
    initialState :{ 
        loginLoader:false,
        signupLoader:false,
        signupSuccess:false,
        formLoader:false,
        createUserLoader:false,
        updateUserLoader:false,
        deleteUserLoader:false,
        isUpdated:false,
        payload:null,
        token: null,
        usersData:[],
        selectedUser: null,
        totalData:0
    } ,
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(authenticateUser.pending, (state,action) => {
            state.loginLoader = true
        })
        .addCase(authenticateUser.fulfilled, (state, action) => {
            
            if (action.payload?.success && action.payload?.data?.token) {
                const { token } = action.payload.data;
                localStorage.setItem("token", token);
                state.token = token;
                state.loginLoader = false;
            } 
        })
        .addCase(authenticateUser.rejected, (state,action) => {
            state.loginLoader = false
            toast.error("Invalid login response. Please try again.");
        })
        .addCase(registerUser.pending, (state) => {
            state.signupLoader = true
            state.signupSuccess = false
        })
        .addCase(registerUser.fulfilled, (state, action) => { 
            state.signupLoader = false;
            state.signupSuccess = true
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.signupLoader = false;
            state.signupSuccess = false
            toast.error("Failed to register user: " + (action.error?.message || "Unknown error"));
        })
        .addCase(fetchAllUsersData.pending, (state, action) => {
            state.getAllUsersLoader = true         
        })
        .addCase(fetchAllUsersData.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) {
                state.usersData = action.payload.data;
                state.totalData = action.payload.totalData;
            }
            state.getAllUsersLoader = false;
        })
        .addCase(fetchAllUsersData.rejected, (state, action) =>{
            state.getAllUsersLoader = false
            toast.error("Failed to fetch users: " + (action.error.message || "Unknown error"));
        })
        .addCase(deleteUser.pending, (state, action) => {
            state.deleteUserLoader = true
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.usersData = state.usersData.filter((user) => user._id !== action.payload);
            state.totalData -= 1
            state.deleteUserLoader = false

        })
        
        .addCase(deleteUser.rejected, (state, action) => {
            state.deleteUserLoader = false
            toast.error("Failed to delete user: " + (action.error.message || "Unknown error"));       
        })
        .addCase(postUserData.pending, (state, action) => {
            state.formLoader = true
        })
        .addCase(postUserData.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) { 
                state.usersData.push(action.payload.data); 
                state.totalData += 1;
                state.formLoader = false;
                toast.success("User created.")
            }
            
        })
        .addCase(postUserData.rejected, (state, action) => {
            state.formLoader = false;
            toast.error("Failed to create user: " + action.error.message);
        })
        .addCase(getSpecificUserData.pending, (state, action) => {
        })
        .addCase(getSpecificUserData.fulfilled, (state, action) => {
            state.selectedUser  = action.payload.data
        })
        .addCase(getSpecificUserData.rejected, (state, action) => {
            toast.error("Failed to fetch user data: " + action.error.message);
        })
        .addCase(updateUserData.pending, (state, action) => {
            state.formLoader = true
        })
        .addCase(updateUserData.fulfilled, (state, action) => {
            const updatedUser = action.payload.data;
            state.usersData = state.usersData.map(user =>
                user._id === updatedUser._id ? updatedUser : user
            );
            state.formLoader = false
            toast.success("User updated");
        })
        .addCase(updateUserData.rejected, (state, action) => {
            state.formLoader = false
            toast.error("Failed to update user: " + action.error.message);
        })
    }
})


export default userSlice.reducer;