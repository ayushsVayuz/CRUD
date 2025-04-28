import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Authenticate user
export const authenticateUser = createAsyncThunk("authenticateUser", 
    async(formData) => {
        const response = await axios.post(
            import.meta.env.VITE_API + `/auth/login`, 
            formData,
            {
                headers: {
                    "Content-Type":"application/json",
                }
            });
            return response.data
    }
)

// Register user
export const registerUser = createAsyncThunk("registerUser" ,
    async(formData) => {
        const response = await axios.post(
            import.meta.env.VITE_API + `/auth/signup`, 
            formData, 
            {
                headers: { "Content-Type": "application/json" }
            });
            console.log("signup", response.data)
            return response.data
    
               
    }
)


// Get all users
export const fetchAllUsersData = createAsyncThunk("fetchAllUsersData",
    async (payload) => {        
        const response = await axios.get(import.meta.env.VITE_API + `/users`,{
            params:{
                page: payload?.pageNumber,
                limit:payload?.pageLimit,
                search: payload?.searchQuery
            },             
       });
       return response.data
       
    }
)

// Post user data

export const postUserData = createAsyncThunk("postUserData",
    async (formData) => {
        try {
            const response = await axios.post(import.meta.env.VITE_API + `/users`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }
);

// Get specific user data
export const getSpecificUserData = createAsyncThunk("getSpecificUserData", 
    async (userId) => {
        
        const response = await axios.get(
            import.meta.env.VITE_API + `/users/${userId}`
        ).catch(function (error) {
            console.log(error.response.data);
        });
        return response.data
    }
)

// Update a user data
export const updateUserData = createAsyncThunk("updateUserData",
    
    async (payload) => {
        const response = await axios.put(
            import.meta.env.VITE_API + `/users/${payload.id}`,
            payload.formData, 
            {
              headers: {
              "Content-Type": "multipart/form-data",
              }
            },
          ).catch(function (error) {
            console.log(error.response.data);
          });
          
          return response.data
    }
   
)

// Delete a user

  export const deleteUser = createAsyncThunk("deleteUser",
    async (userId) => {
        try {
            const response = await axios.delete(import.meta.env.VITE_API + `/users/${userId}`);
            return userId; 
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
);

