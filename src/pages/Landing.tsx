import ProductList from '../components/ProductList/ProductList';
import styled from 'styled-components'

const FlexRow = styled.div`
  display: flex;
`;

const Landing: React.FC<{}> = () => {
  return (
    <FlexRow>
      <ProductList/>
    </FlexRow>
  )
}

export default Landing;