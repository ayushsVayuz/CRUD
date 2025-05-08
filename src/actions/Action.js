import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * @param {Object} formData - User login credentials.
 * @return {Promise<Object>} Authentication response data.
 */
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

/**
 * @param {Object} formData - User registration details.
 * @return {Promise<Object>} Registration response data.
 */
export const registerUser = createAsyncThunk("registerUser" ,
    async(formData) => {
        const response = await axios.post(
            import.meta.env.VITE_API + `/auth/signup`, 
            formData, 
            {
                headers: { "Content-Type": "application/json" }
            });
            return response.data
    
               
    }
)


/**
 * @param {Object} payload - Contains pagination and search parameters.
 * @return {Promise<Object>} List of users based on provided filters.
 */
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

/**
 * @param {Object} formData - User data to be created.
 * @return {Promise<Object>} Created user information.
 */
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

/**
 * @param {string} userId - Unique identifier of the user.
 * @return {Promise<Object>} User details.
 */
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


/**
 * @param {Object} payload - Contains user ID and updated form data.
 * @return {Promise<Object>} Updated user details.
 */
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


/**
 * @param {string} userId - Unique identifier of the user to be deleted.
 * @return {Promise<string>} ID of the deleted user.
 */


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

