import { create } from "zustand";

export const zustandStore = create((set) => ({
  darkMode: false,
  cartItems: [],
  cart: [],

  toggleDark: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),
  
  addToCart: (product) => 
    set((state) => ({
      cartItems: [...state.cartItems, { ...product, cartId: Date.now() + Math.random(), quantity: 1 }]
    })),
  
  setCart: (cart) =>
    set({ cart }),
  
  setCartItems: (cartItems) =>
    set({ cartItems }),
}));