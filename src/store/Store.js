
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { faL } from "@fortawesome/free-solid-svg-icons";

const userStore = create((set, get) => ({
  loginLoader: false,
  signupLoader: false,
  getAllUsersLoader: false,
  createUserLoader: false,
  updateUserLoader:false,
  deleteUserLoader: false,
  payload: null,
  token: null,
  usersData: [],
  selectedUser: null,
  updatedUser: null,
  totalData: 0,
  signupSuccess:false,
  formSuccess:false,
  deleteSuccess:false,

  async authenticateUser(formData) {
    set({ loginLoader: true });

    try {
      const response = await axios.post(
        import.meta.env.VITE_API + "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      set({
        loginLoader: false,
        token: response.data.data.token,
        payload: response.data.data,
      });
    } catch (error) {
      set({
        loginLoader: false,
      });
      
      toast.error("Login failed!")
    }
  },

  async registerUser(formData) {
    set({ signupLoader: true,
      signupSuccess:false
     });

    try {
      const response = await axios.post(
        import.meta.env.VITE_API + `/auth/signup`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      set({
        signupLoader: false,
        payload: response.data.data,
        signupSuccess: true
      });
    } catch (error) {
      set({
        signupLoader: false,
        signupSuccess: false
      });
      toast.error("Signup failed!")
    }
  },

  async fetchAllUsersData(payload) {
    set({ getAllUsersLoader: true });

    try {
      const response = await axios.get(import.meta.env.VITE_API + `/users`, {
        params: {
          page: payload?.pageNumber,
          limit: payload?.pageLimit,
          search: payload?.searchQuery,
        },
      });

      set({
        usersData: response.data.data,
        totalData: response.data.totalData,
        getAllUsersLoader: false,
      });
    } catch (error) {
      set({
        getAllUsersLoader: false,
      
      });
      toast.error("Fetching users data failed!");
    }
  },

  async deleteUser(userId) {
    set({ deleteUserLoader: true });
    try {
      const response = await axios.delete(
        import.meta.env.VITE_API + `/users/${userId}`
      );
      set({
        usersData: usersData.filter((user) => user._id !== response.data.data),
        deleteUserLoader: false,
        totalData: totalData - 1,
      });
    } catch (error) {
      set({
        deleteUserLoader: false,
      });
      toast.error("Deletion of user failed.")
    }
  },

  async getSpecificUserData(userId) {
    try {
      
      const response = await axios
        .get(import.meta.env.VITE_API + `/users/${userId}`)
        .catch(function (error) {
          console.log(error.response.data);
        });

      set({
        selectedUser: response.data.data,
      });
    } catch (error) {
        toast.error("Unable to fetch user data")
    }
  },

  async postUserData(formData) {
    set({formLoader: true, 
      formSuccess:false
    })
    
    try {
      const response = await axios.post(
        import.meta.env.VITE_API + `/users`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      
      set((state) => ({ 
        formLoader:false,
        totalData : get().totalData + 1,
        formSuccess: true,
        usersData : [...state.usersData, response.data.data]
      }))
      console.log("formsuccess succ posinfgt", get().formSuccess);
      
    } catch (error) {
      set({
        formLoader:false,
        formSuccess:false
      })
      toast.error("Creation of user failed!")
    }
  },

    
  async updateUserData(payload) {
    set({ formLoader:true,
      formSuccess: false
     })
      
    try {
      const response = await axios.put(
          import.meta.env.VITE_API + `/users/${payload.id}`,
          payload.formData, 
          {
            headers: {
            "Content-Type": "multipart/form-data",
            }
          },
        )
        set({
          formLoader:false,
          formSuccess:true,
          updatedUser : response.data.data,
          usersData: Array.isArray(usersData => usersData?.map(user => user._id === updatedUser._id ? updatedUser : user),)
        })
        console.log("formsuccess succ 34534554654", get().formSuccess);
      } catch(error) {
        set({
          formLoader:false,
          formSuccess: false,
        })
        toast.error("Updation of user failed!")
      }
        
        
  }
       
    

}));

export default userStore;
