import { createSlice } from '@reduxjs/toolkit';

function getLastId(purchases) {
  let id = 0;
  purchases.forEach(p => {
    if (p.id > id) {
      id = p.id;
    }
  });
  return id + 1;
}

const initialState = {
  items: [],
};

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    addPurchase({ items }, action) {
      items.push({ id: getLastId(items), time: new Date().toISOString(), ...action.payload });
    },
    deletePurchase(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { addPurchase } = purchasesSlice.actions;

export default purchasesSlice.reducer;