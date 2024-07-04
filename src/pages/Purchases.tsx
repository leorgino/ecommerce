import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading/LoadingComponent';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Purchase {
  id: number;
  productId: number;
  quantity: number;
  createdAt: string;
  product: {
    id: number;
    title: string;
    price: string;
  };
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PurchaseItem = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Purchases: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setPurchases(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching purchases:', err);
        setError('Failed to load purchases. Please try again later.');
        setLoading(false);
      }
    };

    if (user) {
      fetchPurchases();
    }
  }, [user]);

  if (loading) return  <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Title>Your Purchases</Title>
      {
        purchases.length === 0 ? (
          <p>You haven't made any purchases yet.</p>
        ) : (
          purchases.map((purchase) => (
            <PurchaseItem key={purchase.id}>
              <h3>{purchase.product.title}</h3>
              <p>Quantity: {purchase.quantity}</p>
              <p>Price: ${purchase.product.price}</p>
              <p>Date: {new Date(purchase.createdAt).toLocaleDateString()}</p>
            </PurchaseItem>
          ))
        )
      }
    </Container>
  );
};

export default Purchases;