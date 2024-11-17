import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '../../services/apiService';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Thunk
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await register(userData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response?.data || error.message);  // Updated error handling
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await login(userData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response?.data || error.message);  // Updated error handling
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.newUser;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || 'An unknown error occurred';  // Updated error handling
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        localStorage.setItem('token', payload.token);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || 'An unknown error occurred';  // Updated error handling
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
