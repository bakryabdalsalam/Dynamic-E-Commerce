import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  filters: {
    category: string;
    priceSort: 'asc' | 'desc' | null;
  };
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  itemsPerPage: 12,
  filters: {
    category: '',
    priceSort: null,
  },
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setPriceSort: (state, action: PayloadAction<'asc' | 'desc' | null>) => {
      state.filters.priceSort = action.payload;
      applyFilters(state);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

const applyFilters = (state: ProductsState) => {
  let filtered = [...state.items];
  
  if (state.filters.category) {
    filtered = filtered.filter(item => item.category === state.filters.category);
  }
  
  if (state.filters.priceSort) {
    filtered.sort((a, b) => {
      return state.filters.priceSort === 'asc' 
        ? a.price - b.price 
        : b.price - a.price;
    });
  }
  
  state.filteredItems = filtered;
};

export const { setCategory, setPriceSort, setPage } = productsSlice.actions;
export default productsSlice.reducer;