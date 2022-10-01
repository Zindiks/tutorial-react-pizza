import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, sort, order, search, current } = params;
  const { data } = await axios.get(
    `https://632b84c01aabd8373987c21e.mockapi.io/items?${current}${category}${sort}${order}${search}`,
  );

  return data;
});

const initialState = {
  data: [],
  status: 'loading', // loading | success | error
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.pending]: (state) => {
      state.data = [];
      state.status = 'loading';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.data = [];
    },
  },
});

export const { setData } = pizzasSlice.actions;

export default pizzasSlice.reducer;
