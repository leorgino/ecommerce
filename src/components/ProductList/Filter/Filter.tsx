import { useState, useEffect } from 'react';
import axios from 'axios';
import { Category } from '../../../types';
import styled from 'styled-components'

const FilterWrapper = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  gap: 20px;
`;


const FilterSection = styled.div`
  display: flex;
  align-items: center;
`;

const FilterLabel = styled.label`
  margin-bottom: 10px;

`;

const FilterInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 241px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const LabelIpunt = styled.label`
  flex-grow: 1;
  margin-right: 5px;
`;

interface IProps {
  searchByCategory: string
  setSearchByCategory: React.Dispatch<React.SetStateAction<string>>
  setPriceRange: React.Dispatch<React.SetStateAction<{
    from: number;
    to: number;
  }>>
  priceRange: {
    from: number;
    to: number;
  }
}
const Filter: React.FC<IProps> = ({
  searchByCategory,
  setSearchByCategory,
  setPriceRange,
  priceRange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse] = await Promise.all([
          axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
        ]);

        setCategories(categoryResponse.data);
        // setCategories(categoryResponse.data);
      } catch (error: any) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, [searchByCategory]);


  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSearchByCategory(category);
  };

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPriceRange(prev => ({ ...prev, [name]: value ? parseFloat(value) : (name === 'from' ? 0 : Infinity) }));
  };

  return (
    <FilterWrapper>
      <FilterSection>
        <FlexColumn>
          <FilterLabel>Price:</FilterLabel>
          <FlexRow>
            <LabelIpunt>From</LabelIpunt>
            <FilterInput
              type="number"
              name="from"
              placeholder="From"
              value={priceRange.from === 0 ? '' : priceRange.from.toString()}
              onChange={handlePriceRangeChange}
            />
          </FlexRow>
          <FlexRow>
            <LabelIpunt>To</LabelIpunt>
            <FilterInput
              type="number"
              name="to"
              placeholder="To"
              value={priceRange.to === Infinity ? '' : priceRange.to.toString()}
              onChange={handlePriceRangeChange}
            />
          </FlexRow>
        </FlexColumn>
      </FilterSection>
      <FilterSection>
        <FlexColumn>
          <FilterLabel>Category:</FilterLabel>
          <FilterSelect onChange={handleCategoryChange}>
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </FilterSelect>
        </FlexColumn>
      </FilterSection>
    </FilterWrapper>
  )
}

export default Filter;