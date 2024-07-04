import { Product } from '../../../types'
import { useCart } from '../../../contexts/CartContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Section = styled.div`
  width: 370px;
  padding: 0 12px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #c3bfbf;
  border-radius: 5px;
  box-shadow: 2 6px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 70px;
  padding: 10px;
  height: 400px;
  width: 300px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardImage = styled.img`
  width: auto;
  height: 65%;
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const CardBody = styled.div`
  /* Add styles for card body content here */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px
`;

const ProductItem: React.FC<{product: Product}> = ({
  product
}) => {
  const { addToCart } = useCart();

  return (
    <Section>
      <Card>
        <CardImage src={product.images[0].url} />
        <CardHeader>
          <CardTitle><span>{product.title}</span></CardTitle>
          <Price><span>{product.price}€</span></Price>
        </CardHeader>
        <CardBody>
          {product.description}
        </CardBody>
        <CardFooter>
          <Buttons>
            <Link to={`/products/${product.id}`}>View</Link>
            <button className="" onClick={() => addToCart(product)}>+ add</button>
          </Buttons>
        </CardFooter>
      </Card>
    </Section>
  )
}

export default ProductItem;