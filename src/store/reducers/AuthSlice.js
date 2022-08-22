import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', params);
      return data;
    } catch(error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAuthMe = createAsyncThunk(
  'auth/fetchAuthMe', 
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/auth/me');
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/register', params);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  status: 'loading',
  data: null,
  error: {
    login: null,
    registration: null,
    authMe: null,
  },
};

// const setError = (state, action) => {
//   state.status = 'rejected';
//   state.error = action.payload;
// }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.error = null;
    }
  },
  extraReducers: {
    // fetchAuth:
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
      state.error.login = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error.login = action.payload;
    },


    // fetchAuthMe:
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.error.authMe = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.status = 'rejected';
      state.data = null;
      state.error.authMe = action.payload;

      localStorage.removeItem('token');
    },


    // fetchRegister:
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
      state.error.registration = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error.registration = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;