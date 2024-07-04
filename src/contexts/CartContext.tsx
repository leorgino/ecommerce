import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Product } from '../types';

interface CartItem {
  product: Product
  quantity: number
  productId: number
  updatedAt: string
  userId: number
}

interface CartContextProps {
  cart: CartItem[];
  cartIsOpen: boolean;
  cartTotal: number;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCartItemQuantity: (productId: number, quantity: number) => Promise<void>;
  toggleAsideCart: () => void;
  getCart: () => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode, isMobile: boolean }> = ({ children, isMobile }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    getCart()
  }, []);

  useEffect(() => {
    calculateCart(cart);
  }, [cart]);

  const getCart = async () => {
    try {
      const response = await axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product: Product, quantity: number) => {
    try {
      const existingItem = cart.find(item => item.productId === product.id);
      if (existingItem) {
        await updateCartItemQuantity(product.id, existingItem.quantity + 1);
      } else {
        await axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', {
          quantity,
          productId: product.id
        });
      }
      await getCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${productId}`);
      await getCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItemQuantity = async (productId: number, quantity: number) => {
    try {
      await axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${productId}`, {
        quantity
      });
      await getCart();
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const calculateCart = (cartItems: CartItem[]) => {
    setCartTotal(cartItems.reduce((total, item) => total + parseFloat(item.product.price) * item.quantity, 0));
  };

  const toggleAsideCart = () => {
    setCartIsOpen(!cartIsOpen);
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartIsOpen,
      cartTotal,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      toggleAsideCart,
      getCart,
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