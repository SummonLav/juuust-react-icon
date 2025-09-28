import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 10px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
  }

  svg {
    width: 32px;
    height: 32px;
    margin-bottom: 12px;
  }

  span {
    font-size: 12px;
    color: #666;
    text-align: center;
    word-break: break-word;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    
    &:hover {
      color: #667eea;
    }
  }
`;

const IconWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default IconWrapper;
