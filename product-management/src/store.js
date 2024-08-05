import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 1, name: 'Stainless Steel 304 Pipe', material: 'Stainless Steel', grade: '304', details: 'Material: Stainless Steel\nUnit Length: 6-12 meter\nShape: Round', price: '350' },
    { id: 2, name: 'Carbon Steel A105 Tubing', material: 'Carbon Steel', grade: 'A105', details: 'Material: Carbon Steel\nUnit Length: 6-12 meter\nShape: Round', price: '350' },
 
  ],
  filteredProducts: [],
  searchQuery: '',
  filters: {
    product: '',
    material: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.filteredProducts = [...state.products];
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
        state.filteredProducts = [...state.products];
      }
    },
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
      state.filteredProducts = state.products.filter((product) =>
        (state.filters.product ? product.name.toLowerCase().includes(state.filters.product.toLowerCase()) : true) &&
        (state.filters.material ? product.material.toLowerCase().includes(state.filters.material.toLowerCase()) : true)
      );
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
});

export const { addProduct, updateProduct, setFilter, setSearchQuery } = productSlice.actions;

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});

export default store;
