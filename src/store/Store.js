// import { create } from "zustand";
// import axios from "axios";
// import { toast } from "react-toastify";

// /**
//  * Creates a Zustand store to handle user actions and state updates.
//  */
// const userStore = create((set, get) => ({
//   loginLoader: false,
//   signupLoader: false,
//   getAllUsersLoader: false,
//   getSpecificUserLoader: false,
//   payload: null,
//   token: null,
//   usersData: [],
//   selectedUser: null,
//   userDataObject: null,
//   updatedUser: null,
//   totalData: 0,
//   formLoader: false,
//   user: null,
//   error: null,
//   abortController: null,

//   /**
//    * Authenticates user with API.
//    * @param {Object} formData - User login credentials.
//    * @return {Promise<Object>} API response.
//    */
//   async authenticateUser(formData) {
//     set({ loginLoader: true });

//     try {
//       const response = await axios.post(
//         import.meta.env.VITE_API + "/auth/login",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       set({
//         loginLoader: false,
//         token: response.data.data.token,
//         payload: response.data.data,
//       });
//       return response;
//     } catch (error) {
//       set({
//         loginLoader: false,
//       });
//       toast.error("Login failed!");
//     }
//   },

//   /**
//    * Registers a new user with API.
//    * @param {Object} formData - User registration details.
//    * @return {Promise<Object>} API response.
//    */
//   async registerUser(formData) {
//     set({ signupLoader: true });

//     try {
//       const response = await axios.post(
//         import.meta.env.VITE_API + `/auth/signup`,
//         formData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       set({
//         signupLoader: false,
//         payload: response.data.data,
//       });
//       return response;
//     } catch (error) {
//       set({
//         signupLoader: false,
//       });
//       toast.error("Signup failed!");
//     }
//   },

//   /**
//    * Fetches user data from API with pagination and search.
//    * @param {Object} payload - Contains search query and pagination details.
//    * @return {Promise<Object>} API response.
//    */
//   async fetchAllUsersData(payload) {
//     const controller = new AbortController();
//     const { signal } = controller;

//     set({ getAllUsersLoader: true });

//     const abortRequest = (time) => {
//       return new Promise((_, reject) => {
//         setTimeout(() => {
//           controller.abort();
//           const error = new Error(
//             "Request took too long to respond. Please try again later."
//           );
//           error.name = "AbortError";
//           reject(error);
//           console.log(error.name, "error.name1");
//         }, time);
//       });
//     };

//     const fetchPromise = axios.get(import.meta.env.VITE_API + "/users", {
//       params: {
//         page: payload?.pageNumber,
//         limit: payload?.pageLimit,
//         search: payload?.searchQuery,
//       },
//       signal: signal,
//     });

//     const timeoutPromise = abortRequest(5000);

//     try {
//       const response = await Promise.race([fetchPromise, timeoutPromise]);
//       set({
//         usersData: response.data.data,
//         totalData: response.data.totalData,
//         getAllUsersLoader: false,
//       });
//       return response;
//     } catch (error) {
//       if (error.name === "AbortError") {
//         toast.error("Fetch aborted due to slow API response");
//         set({ getAllUsersLoader: false });
//         return;
//       } else {
//         console.log("Error fetching users:", error);
//         toast.error("Fetching users data failed!");
//       }
//       set({ getAllUsersLoader: false });
//     }
//   },

//   /**
//    * Deletes a user from API.
//    * @param {string} userId - User's unique identifier.
//    * @return {Promise<Object>} API response.
//    */
//   async deleteUser(userId, searchParams) {
//     try {
//       const response = await axios.delete(
//         import.meta.env.VITE_API + `/users/${userId}`
//       );

//       set({
//         usersData: get().usersData.filter((user) => user._id !== userId),
//         totalData: get().totalData - 1,
//       });
//       await get().fetchAllUsersData({
//         pageNumber: searchParams.get("page"),
//         pageLimit: 10,
//       });
//       return response;
//     } catch (error) {
//       toast.error("Deletion of user failed.");
//     }
//   },

//   /**
//    * Fetches specific user details from API.
//    * @param {string} userId - User's unique identifier.
//    * @return {Promise<Object>} API response.
//    */
//   async getSpecificUserData(userId) {
//     set({
//       getSpecificUserLoader: true,
//     });
//     try {
//       const response = await axios
//         .get(import.meta.env.VITE_API + `/users/${userId}`)
//         .catch(function (error) {
//           console.log(error.response.data);
//         });

//       set({
//         selectedUser: response.data.data,
//         getSpecificUserLoader: false,
//       });
//       return response;
//     } catch (error) {
//       set({ getSpecificUserLoader: false });
//       toast.error("Unable to fetch user data");
//        console.log(error.response.data);
//     }
//   },

//   /**
//    * Sends user data to API for creation.
//    * @param {Object} formData - User data.
//    * @return {Promise<Object>} API response.
//    */
//   async postUserData(formData) {
//     set({ formLoader: true });

//     try {
//       const response = await axios.post(
//         import.meta.env.VITE_API + `/users`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       set((state) => ({
//         formLoader: false,
//         totalData: get().totalData + 1,
//         usersData: [response.data.data, ...get().usersData],
//       }));
//       toast.success("User created.");
//       return response;
//     } catch (error) {
//       set({
//         formLoader: false,
//       });
//       toast.error("Creation of user failed!");
//     }
//   },

//   /**
//    * Updates user details in the API.
//    * @param {Object} payload - Contains user ID and updated data.
//    * @return {Promise<Object>} API response.
//    */
//   async updateUserData(payload) {
//     set({ formLoader: true });

//     try {
//       const response = await axios.put(
//         import.meta.env.VITE_API + `/users/${payload.id}`,
//         payload.formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const updatedUser = response?.data?.data;
//       const currentUsers = get().usersData;
//       const updatedUsersData = currentUsers.map((user) =>
//         user._id === payload.id ? updatedUser : user
//       );

//       set({
//         formLoader: false,
//         usersData: updatedUsersData,
//       });
//       toast.success("User updated.");
//       return response;
//     } catch (error) {
//       console.log("Error in updateUserData:", error);
//       set({ formLoader: false });
//       toast.error("User update failed!");
//     }
//   },

//   /**
//    * Updates a user's status in the API and local state.
//    *
//    * @param {Object} payload - Contains user ID and new status.
//    * @returns {Promise<Object>} API response.
//    */
//   async updateStatus(payload) {
//     try {
//       const response = await axios.patch(
//         import.meta.env.VITE_API + `/users/${payload.id}/status`,
//         { status: payload.newStatus },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const currentUsers = get().usersData;
//       const updatedUsersData = currentUsers.map((user) => {
//         if (user._id === payload.id) {
//           return {
//             ...user,
//             status: payload.newStatus,
//           };
//         }
//         return user;
//       });

//       set({
//         usersData: updatedUsersData,
//       });
//       return response;
//     } catch (error) {
//       console.log("Error in updateUserData:", error);
//       toast.error("Status change failed!");
//     }
//   },
// }));

// export default userStore;




import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const getInitialToken = () => localStorage.getItem("token");
const getInitialPayload = () => {
  const raw = localStorage.getItem("payload");
  return raw ? JSON.parse(raw) : null;
};

const userStore = create((set, get) => ({
  loginLoader: false,
  signupLoader: false,
  getAllUsersLoader: false,
  getSpecificUserLoader: false,
  payload: getInitialPayload(),
  token: getInitialToken(),
  usersData: [],
  selectedUser: null,
  userDataObject: null,
  updatedUser: null,
  totalData: 0,
  formLoader: false,
  user: null,
  error: null,
  abortController: null,

  async authenticateUser(formData) {
    set({ loginLoader: true });

    try {
      const response = await axios.post(
        import.meta.env.VITE_API + "/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = response.data.data.token;
      const payload = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("payload", JSON.stringify(payload));

      set({
        loginLoader: false,
        token,
        payload,
      });

      return response;
    } catch (error) {
      set({ loginLoader: false });
      toast.error("Login failed!");
    }
  },

  async registerUser(formData) {
    set({ signupLoader: true });

    try {
      const response = await axios.post(
        import.meta.env.VITE_API + `/auth/signup`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const payload = response.data.data;

      localStorage.setItem("payload", JSON.stringify(payload));

      set({
        signupLoader: false,
        payload,
      });

      return response;
    } catch (error) {
      set({ signupLoader: false });
      toast.error("Signup failed!");
    }
  },

  async fetchAllUsersData(payload) {
    const controller = new AbortController();
    const { signal } = controller;

    set({ getAllUsersLoader: true });

    const abortRequest = (time) => {
      return new Promise((_, reject) => {
        setTimeout(() => {
          controller.abort();
          const error = new Error("Request timed out.");
          error.name = "AbortError";
          reject(error);
        }, time);
      });
    };

    const fetchPromise = axios.get(import.meta.env.VITE_API + "/users", {
      params: {
        page: payload?.pageNumber,
        limit: payload?.pageLimit,
        search: payload?.searchQuery,
      },
      signal: signal,
    });

    const timeoutPromise = abortRequest(5000);

    try {
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      set({
        usersData: response.data.data,
        totalData: response.data.totalData,
        getAllUsersLoader: false,
      });
      return response;
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Fetch aborted due to slow API response");
      } else {
        toast.error("Fetching users data failed!");
      }
      set({ getAllUsersLoader: false });
    }
  },

  async deleteUser(userId, searchParams) {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_API + `/users/${userId}`
      );

      set({
        usersData: get().usersData.filter((user) => user._id !== userId),
        totalData: get().totalData - 1,
      });

      await get().fetchAllUsersData({
        pageNumber: searchParams.get("page"),
        pageLimit: 10,
      });

      return response;
    } catch (error) {
      toast.error("Deletion of user failed.");
    }
  },

  async getSpecificUserData(userId) {
    set({ getSpecificUserLoader: true });

    try {
      const response = await axios.get(
        import.meta.env.VITE_API + `/users/${userId}`
      );

      set({
        selectedUser: response.data.data,
        getSpecificUserLoader: false,
      });

      return response;
    } catch (error) {
      set({ getSpecificUserLoader: false });
      toast.error("Unable to fetch user data");
    }
  },

  async postUserData(formData) {
    set({ formLoader: true });

    try {
      const response = await axios.post(
        import.meta.env.VITE_API + `/users`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      set((state) => ({
        formLoader: false,
        totalData: state.totalData + 1,
        usersData: [response.data.data, ...state.usersData],
      }));

      toast.success("User created.");
      return response;
    } catch (error) {
      set({ formLoader: false });
      toast.error("Creation of user failed!");
    }
  },

  async updateUserData(payload) {
    set({ formLoader: true });

    try {
      const response = await axios.put(
        import.meta.env.VITE_API + `/users/${payload.id}`,
        payload.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = response?.data?.data;
      const updatedUsersData = get().usersData.map((user) =>
        user._id === payload.id ? updatedUser : user
      );

      set({
        formLoader: false,
        usersData: updatedUsersData,
      });

      toast.success("User updated.");
      return response;
    } catch (error) {
      set({ formLoader: false });
      toast.error("User update failed!");
    }
  },

  async updateStatus(payload) {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_API + `/users/${payload.id}/status`,
        { status: payload.newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUsersData = get().usersData.map((user) =>
        user._id === payload.id
          ? { ...user, status: payload.newStatus }
          : user
      );

      set({ usersData: updatedUsersData });

      return response;
    } catch (error) {
      toast.error("Status change failed!");
    }
  },

  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("payload");

    set({
      token: null,
      payload: null,
    });
  },
}));

export default userStore;
