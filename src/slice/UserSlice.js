import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser, registerUser, fetchAllUsersData, deleteUser, postUserData, getSpecificUserData, updateUserData } from "../actions/Action";
import { toast } from 'react-toastify';

// It defines the user slice, which contains actions and reducers for managing user's state
export const userSlice = createSlice({
    name: "userData",
    initialState :{ 
        loading:false,
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
            state.loading = true
        })
        .addCase(authenticateUser.fulfilled, (state, action) => {
            
            if (action.payload?.success && action.payload?.data?.token) {
                const { token } = action.payload.data;
                
                const expiresAt = Date.now() + 120 * 60 * 1000;
                localStorage.setItem("token", token);
                localStorage.setItem("expiresAt", expiresAt);
        
                state.token = token;
                state.loading = true;
                toast.success("Login successful!");
            } 
        })
        .addCase(authenticateUser.rejected, (state,action) => {
            state.loading = false
            toast.error("Invalid login response. Please try again.");
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload?.success) {
                toast.success("User registered successfully!");
            } 
            state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            toast.error("Failed to register user: " + (action.error?.message || "Unknown error"));
        })
        .addCase(fetchAllUsersData.pending, (state, action) => {
            state.loading = true         
        })
        .addCase(fetchAllUsersData.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) {
                state.usersData = action.payload.data;
                state.totalData = action.payload.totalData;
            }
            state.loading = false;
        })
        .addCase(fetchAllUsersData.rejected, (state, action) =>{
            state.loading = false
            toast.error("Failed to fetch users: " + (action.error.message || "Unknown error"));
        })
        .addCase(deleteUser.pending, (state, action) => {
            toast.info("removing the user");
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.usersData = state.usersData.filter((user) => user._id !== action.payload);
            state.totalData -= 1
            toast.success("User removed "); 
        })
        
        .addCase(deleteUser.rejected, (state, action) => {
            toast.error("Failed to delete user: " + (action.error.message || "Unknown error"));       
        })
        .addCase(postUserData.pending, (state, action) => {
            state.loading = true     
        })
        .addCase(postUserData.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) { 
                state.usersData.push(action.payload.data); 
                state.totalData += 1;
            }
            state.loading = false;
            toast.success("User created.")
        })
        .addCase(postUserData.rejected, (state, action) => {
            state.loading = false;
            toast.error("Failed to create user: " + action.error.message);
        })
        .addCase(getSpecificUserData.pending, (state, action) => {
            state.loading = true  
        })
        .addCase(getSpecificUserData.fulfilled, (state, action) => {
            state.selectedUser  = action.payload.data
            state.loading = false
        })
        .addCase(getSpecificUserData.rejected, (state, action) => {
            state.loading = false;
            toast.error("Failed to fetch user: " + action.error.message);
        })
        .addCase(updateUserData.pending, (state, action) => {
            state.loading = true
        })
        .addCase(updateUserData.fulfilled, (state, action) => {
            const updatedUser = action.payload.data;
            state.usersData = state.usersData.map(user =>
                user._id === updatedUser._id ? updatedUser : user
            );
            state.loading = false;
            toast.success("User updated");
        })
        .addCase(updateUserData.rejected, (state, action) => {
            state.loading = false;
            toast.error("Failed to update user: " + action.error.message);
        })
    }
})


export default userSlice.reducer;