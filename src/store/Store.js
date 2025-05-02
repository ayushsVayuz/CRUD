import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * Creates a Zustand store to handle user actions and state updates.
 */
const userStore = create((set, get) => ({
  loginLoader: false,
  signupLoader: false,
  getAllUsersLoader: false,
  getSpecificUserLoader: false,
  createUserLoader: false,
  updateUserLoader: false,
  payload: null,
  token: null,
  usersData: [],
  selectedUser: null,
  updatedUser: null,
  totalData: 0,

  /**
   * Authenticates user with API.
   * @param {Object} formData - User login credentials.
   * @return {Promise<Object>} API response.
   */
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
      return response;
    } catch (error) {
      set({
        loginLoader: false,
      });

      toast.error("Login failed!");
    }
  },

  /**
   * Registers a new user with API.
   * @param {Object} formData - User registration details.
   * @return {Promise<Object>} API response.
   */
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

      set({
        signupLoader: false,
        payload: response.data.data,
      });
      return response;
    } catch (error) {
      set({
        signupLoader: false,
      });
      toast.error("Signup failed!");
    }
  },

  /**
   * Fetches user data from API with pagination and search.
   * @param {Object} payload - Contains search query and pagination details.
   * @return {Promise<Object>} API response.
   */
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
      return response;
    } catch (error) {
      set({
        getAllUsersLoader: false,
      });
      toast.error("Fetching users data failed!");
    }
  },

  /**
   * Deletes a user from API.
   * @param {string} userId - User's unique identifier.
   * @return {Promise<Object>} API response.
   */
  async deleteUser(userId) {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_API + `/users/${userId}`
      );

      set((state) => ({
        usersData: state.usersData.filter((user) => user._id !== userId),
        totalData: get().totalData - 1,
      }));
      return response;
    } catch (error) {
      toast.error("Deletion of user failed.");
    }
  },

  /**
   * Fetches specific user details from API.
   * @param {string} userId - User's unique identifier.
   * @return {Promise<Object>} API response.
   */
  async getSpecificUserData(userId) {
    set({ getSpecificUserLoader: true });
    try {
      const response = await axios
        .get(import.meta.env.VITE_API + `/users/${userId}`)
        .catch(function (error) {
          console.log(error.response.data);
        });

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

  /**
   * Sends user data to API for creation.
   * @param {Object} formData - User data.
   * @return {Promise<Object>} API response.
   */
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
        totalData: get().totalData + 1,
        usersData: [...state.usersData, response.data.data],
      }));
      toast.success("User created.");

      return response;
    } catch (error) {
      set({
        formLoader: false,
      });
      toast.error("Creation of user failed!");
    }
  },

  /**
   * Updates user details in the API.
   * @param {Object} payload - Contains user ID and updated data.
   * @return {Promise<Object>} API response.
   */
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
      set({
        formLoader: false,
        updatedUser: response.data.data,
        usersData: Array.isArray((usersData) =>
          usersData?.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        ),
      });
      toast.success("User updated.");
      return response;
    } catch (error) {
      set({
        formLoader: false,
      });
      toast.error("User update failed!");
    }
  },
}));

export default userStore;
