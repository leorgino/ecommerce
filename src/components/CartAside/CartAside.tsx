import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import axios from 'axios';
import styled from 'styled-components'
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';

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
  display: flex;
  justify-content: center;
`;

const PayButton = styled.button`
  background: lightblue;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CartAside: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const { cart, removeFromCart, cartIsOpen, toggleAsideCart, getCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  if(!cartIsOpen) return null

  const closeAside = () => {
    toggleAsideCart()
  }

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.product.price) * item.quantity, 0);

  const proceedToPay = async () => {
    setIsLoading(true);
    try {
      await axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getCart();
      closeAside();
    } catch (error) {
      console.error('Error proceeding to pay:', error);
    } finally {
      setIsLoading(false);
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
          <ListItem key={item.productId}>
            <span>{item.product.title} - {item.quantity} x {item.product.price} = ({item.quantity * parseFloat(item.product.price)})  </span>
            <span>
              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.productId)}>&times;</button>
            </span>
          </ListItem>
        ))}
      </ul>

      {isAuthenticated &&
        <PayButtonWrapper>
          <PayButton onClick={proceedToPay} disabled={isLoading}>
            <span>Pagar ${totalPrice.toFixed(2)}</span> { isLoading && <LoadingSpinner width='10px' height='10px'/> }
          </PayButton>
        </PayButtonWrapper>
      }
    </Aside>
  );
};

export default CartAside;
