import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../../types';
import ProductItem from './ProductItem/ProductItem';
import Searcher from './Searcher/Searcher';
import Filter from './Filter/Filter';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const baseUrl = 'https://e-commerce-api-v2.academlo.tech/api/v1/products';

const ProductList: React.FC<{}> = () => {
  const [searchByCategory, setSearchByCategory] = useState<string>('');
  const [searchByName, setSearchByName] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState({ from: 0, to: Infinity });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl;

        if (searchByCategory) {
          url += `?categoryId=${searchByCategory}`;
        }

        if (searchByName) {
          url += searchByCategory ? `&title=${searchByName}` : `?title=${searchByName}`;
        }
        const [productResponse] = await Promise.all([
          axios.get(url),
        ]);

        setProducts(productResponse.data);
        // setCategories(categoryResponse.data);
      } catch (error: any) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, [searchByCategory, searchByName]);

  const filteredProducts = products.filter((product: Product) => {
    const price = parseFloat(product.price);
    return price >= priceRange.from && price <= priceRange.to;
  });

  return (
    <Container>
      <Filter
        priceRange={priceRange}
        searchByCategory={searchByCategory}
        setSearchByCategory={setSearchByCategory}
        setPriceRange={setPriceRange}
      />
      <FlexColumn>
        <Searcher setSearchByName={setSearchByName}/>
        <FlexRow>
          {filteredProducts.map((product: Product, index: number) => (
            <ProductItem key={index} product={product} />
          ))}
        </FlexRow>
      </FlexColumn>
    </Container>
  );
};

export default ProductList;
