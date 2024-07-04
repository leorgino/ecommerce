import React from 'react';
import styled from 'styled-components';

const Loading= styled.div`
  display: inline-block;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingSpinner: React.FC<{height?: string, width?: string}> = ({
  height = '40px',
  width = '40px'
}) => {
  return (<Loading style={{width: width, height: height}}/>)
}
export default LoadingSpinner;