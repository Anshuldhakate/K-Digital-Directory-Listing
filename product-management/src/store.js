import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  products: [
    // Example product structure
    { id: 1, name: 'Stainless Steel 304 Pipe', details: 'Material: Stainless Steel\nUnit Length: 6-12 meter\nShape: Round', price: '350 / KG' },
    // Add more products as needed
  ],
};

// Create a slice for products
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
  },
});

export const { addProduct, updateProduct } = productSlice.actions;

// Configure the store
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});

export default store;
