import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`;

export const NavBar = styled.nav`
  padding-right: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  background: red;
`;

export const Title = styled.h1`
  font-size: 3.6rem;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
`;

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;