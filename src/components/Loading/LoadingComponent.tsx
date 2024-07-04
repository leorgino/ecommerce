import React from 'react';
import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner'

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100%;
`;


const LoadingComponent: React.FC = () => (
  <LoadingContainer>
    <LoadingSpinner />
  </LoadingContainer>
);

export default LoadingComponent;