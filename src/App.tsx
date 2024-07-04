import AppRoutes from './AppRoutes'
import './App.css';
import { CartProvider } from './contexts/CartContext';
import styled from 'styled-components'
import useMediaQuery from "../src/hooks/useMediaQuery";

const Container = styled.main``;

function App() {
  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <CartProvider isMobile={isMobile}>
      <Container>
        <AppRoutes />
      </Container>
    </CartProvider>
  );
}

export default App;
