import React from 'react';
import { useCart } from '../../contexts/CartContext';
import CartAside from '../CartAside/CartAside';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import CartImage from '../Images/cart.png'
import ProfileIcon from '../Images/profile.png'
import BoxImage from '../Images/box.png'

const Nav = styled.div`
  background: #bfb9b9;
  padding: 5px 12px 5px 12px;
  margin-bottom: 10px;
`;

const ItemsContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BrandItem = styled.span`
  cursor: pointer;
  color: #f85454;
  display: block;
  flex: 1 1;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 14px 20px;
`

const Item = styled.span`
cursor: pointer;
width: 150px;
`

const CartButton = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const NavBar: React.FC<{}> = () => {
  const { cart, cartTotal, toggleAsideCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <Nav>
        <ItemsContent>
          <BrandItem onClick={() => navigate('/')}>
            <strong>Ecommerce Leorgino</strong>
          </BrandItem>
          <Item>
            <Link to="/profile"><img src={ProfileIcon} alt='profile' /></Link>
          </Item>
          <Item><img src={BoxImage} alt="purchases"/></Item>
          <CartButton onClick={() => toggleAsideCart()}>
            <img src={CartImage} alt="cart"/> ({cart.length}) - {cartTotal}€
          </CartButton>
        </ItemsContent>
      </Nav>
      <CartAside/>
    </>
  );
};

export default NavBar;
