import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  cartIsOpen: boolean
  cartTotal: number
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleAsideCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode, isMobile: boolean }> = ({ children, isMobile }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);
  const [cartTotal, setCartTotal] = useState<number>(0);
  useEffect(() => {
    calculateCart(cart);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => addItem(prevCart, product));
  };

  const addItem = (prevCart: CartItem[], product: Product) => {
    const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

    return [...prevCart, { ...product, quantity: 1 }];
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    calculateCart(cart);
  };

  const calculateCart = (cartItems: CartItem[]) => {
    setCartTotal(cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0));
  }

  const clearCart = () => {
    setCart([]);
    calculateCart(cart);
  };

  const toggleAsideCart = () => {
    setCartIsOpen(!cartIsOpen)
  };

  return (
    <CartContext.Provider value={{
      cart, cartIsOpen, cartTotal, addToCart, removeFromCart, clearCart, toggleAsideCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
