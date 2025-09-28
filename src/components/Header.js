import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  font-weight: 300;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>React Icon Library</Title>
      <Subtitle>Generated from Figma designs</Subtitle>
    </HeaderContainer>
  );
};

export default Header;
