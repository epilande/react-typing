import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Typing } from 'react-typing';

const colors = {
  background: '#F9F6F2',
  primary: '#E55A32',
  text: '#1B4B61',
};

// eslint-disable-next-line
injectGlobal`
  body {
    background: ${colors.background};
    text-align: center;
    font-family: "Avenir Next", BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
    letter-spacing: 0.1rem;
    color: ${colors.text};
  }
  p {
    font-size: 1.125rem;
  }
`;

const Title = styled.h3`
  margin-top: 12.5rem;
  color: ${colors.primary};
  font-size: 2.25rem;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
`;

const Invert = styled.span`
  padding: 0.5rem 1.25rem;
  background: ${colors.primary};
  color: ${colors.background};
`;

export default () => (
  <div>
    <Typing>
      <Title><Invert>React</Invert> Typing</Title>
      <p><strong>Typing animation with react</strong></p>
    </Typing>
  </div>
);
