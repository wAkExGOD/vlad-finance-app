import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    addPurchase({ items }, action) {
      items.push({ id: items[items.length - 1].id + 1, time: new Date().toISOString(), ...action.payload });
    },
    deletePurchase(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { addPurchase } = purchasesSlice.actions;

export default purchasesSlice.reducer;