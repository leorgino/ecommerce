import React, { useState } from 'react';
import LupaIcon from '../../Images/lupa.png';
import styled from 'styled-components';

interface SearcherProps {
  setSearchByName: (value: string) => void;
}

const Section = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  flex: 1;
  max-width: 300px;
`;

const Button = styled.button`
  background-color: #f85454;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #eb8989;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

export const Searcher: React.FC<SearcherProps> = ({ setSearchByName }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    setSearchByName(inputValue);
  };

  return (
    <Section>
      <Label htmlFor="search">Buscar</Label>
      <Input
        type="text"
        name="search"
        autoFocus
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button onClick={handleClick}>
        <Icon src={LupaIcon} alt="lupa" />
      </Button>
    </Section>
  );
};

export default Searcher;
