import React from 'react';
import { useCart } from '../../contexts/CartContext';
import styled from 'styled-components'
import axios from 'axios';

const Aside = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  background: #ede7e2;
  padding: 20px;
  height: 100vh;
  width: 380px;
  float: none;
  margin-right: 5px;
  border: 1px solid gray;
`;

const CloseAside = styled.button`
  display: flex;
  position: absolute;
  right: 0;
  margin-right: 10px;
`;

const Title = styled.h2`
  text-align: center;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 6px;
`;

const PayButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const PayButton = styled.button`
  background: lightblue;
  padding: 10px;
  border-radius: 10px;
`;

const CartAside: React.FC = () => {
  const { cart, removeFromCart, clearCart, cartIsOpen, toggleAsideCart} = useCart();

  if(!cartIsOpen) return null

  const closeAside = () => {
    toggleAsideCart()
  }

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  const proceedToPay = async () => {
    const order = {
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      })),
      total: totalPrice
    };

    try {
      const response = axios.post('http://localhost:3000/orders', order);
      console.log('response', response);
      clearCart();
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <Aside>
      <CloseAside onClick={() => closeAside()}>
        X
      </CloseAside>

      <Title>Shopping Cart</Title>
      <ul className="list-group">
        {cart.map(item => (
          <ListItem key={item.id}>
            <span>{item.title} x {item.quantity}</span>
            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>&times;</button>
          </ListItem>
        ))}
      </ul>
      <button className="btn btn-secondary mt-3" onClick={clearCart}>Clear Cart</button>

      <PayButtonWrapper>
        <PayButton onClick={proceedToPay}>Pagar ${totalPrice.toFixed(2)}</PayButton>
      </PayButtonWrapper>
    </Aside>
  );
};

export default CartAside;
