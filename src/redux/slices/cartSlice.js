import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    onClickPlus(state, action) {
      const findItem = state.items.find(
        (item) => item.currentPizza === action.payload.currentPizza,
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },

    onClickMinus(state, action) {
      const findItem = state.items.find((item) => item.currentPizza === action.payload);
      if (findItem) {
        findItem.count--;
      }

      if (findItem.count < 1) {
        state.items = state.items.filter((item) => item !== findItem);
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter((item) => item.currentPizza !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const { onClickPlus, onClickMinus, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
