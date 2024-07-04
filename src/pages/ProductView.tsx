import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types'
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'

const Section = styled.div`
  width: 100%;
  padding: 20px;
`;


const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border: 2px solid;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  height: 500px;
  width: 500px;
  margin: 0 auto;
  padding: 10px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardImage = styled.img`
  width: 100%;
  height: 50%;
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

const ProductView: React.FC<{}> = () => {
  const { addToCart } = useCart();
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [productId]);

  if(!product) return null

  return (
    <div>
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
              <Link to='/'>Back</Link>
              <button className="" onClick={() => addToCart(product, 1)}>+ add</button>
            </Buttons>
          </CardFooter>
        </Card>
      </Section>
    </div>
  )
}

export default ProductView;