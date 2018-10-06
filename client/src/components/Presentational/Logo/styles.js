import styled from 'styled-components';

export const Logo = styled.div`
  width: ${(props) => props.width}px;

  @media (max-width: 550px) {
    width: 35px;
  }
`;
