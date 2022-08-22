import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPurchases = createAsyncThunk(
  'purchases/fetchPurchases',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get('/purchases');
      
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAddPurchase = createAsyncThunk(
  'purchases/fetchAddPurchase',
  async (purchase, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`/purchases`, purchase);

      dispatch(addPurchase(data));
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRemovePurchase = createAsyncThunk(
  'purchases/fetchRemovePurchase',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/purchases/${id}`);
      
      dispatch(deletePurchase(id));
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [],
  status: 'loading',
  error: null,
};

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    addPurchase(state, action) {
      state.items.push(action.payload);
    },
    deletePurchase(state, action) {
      console.log(action.payload);
      state.items = state.items.filter(item => item.purchaseId !== action.payload);
    }
  },
  extraReducers: {
    // get purchases
    [fetchPurchases.pending]: (state) => {
      console.log('getting');
      state.items = [];
      state.status = 'loading';
    },
    [fetchPurchases.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'resolved';
    },
    [fetchPurchases.rejected]: (state, action) => {
      state.items = [];
      state.status = 'rejected';
      state.error = action.payload;
    },

    // remove purchase
    [fetchRemovePurchase.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    // add purchase
    [fetchAddPurchase.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  }
});

export const { addPurchase, deletePurchase } = purchasesSlice.actions;
export const selectPurchases = (state) => state.purchases;

export default purchasesSlice.reducer;