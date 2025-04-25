import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all users
export const fetchUserData = createAsyncThunk("fetchUserData",
    async (payload) => {        
        const response = await axios.get(import.meta.env.VITE_API + `/users`,{
            params:{
                page: payload?.pageNumber,
                limit:payload?.pageLimit,
                search: payload?.searchQuery
            },             
       });
       console.log("User Data", response);
       return response.data
       
    }
)

// Delete a user
export const deleteUser = createAsyncThunk("deleteUser",
    async (userId) => {
      await axios.delete(import.meta.env.VITE_API + `/users/${userId}`);
      return userId; 
    }
  );
