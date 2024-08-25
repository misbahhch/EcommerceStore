import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1; 
      } else {
        state.items.push({ ...product, quantity: 1 }); 
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId); 
    },
    clearCart: (state) => {
      state.items = []; 
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find(item => item.id === id);
      if (product) {
        product.quantity = quantity; 
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
