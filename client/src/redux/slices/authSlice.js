import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

// register
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/register`, userData);

      const { message, token } = res.data;

      return { message, token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/login`, userData);

      const { token, username, message } = res.data;

      localStorage.setItem("user", username);
      localStorage.setItem("token", token);

      return { token, username, message };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${API_URL}/update-user`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.setItem("user", userData.username);

      const { message } = res.data;

      return { message };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// logout
export const logout = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null || localStorage.getItem("user"),
    token: null || localStorage.getItem("token"),
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    resetMessages: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload;
        state.success = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.error = null;
        state.success = null;
      });
  },
});

export const { resetMessages } = authSlice.actions;

export default authSlice.reducer;
