import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
  padding-right: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  background: red;
`;

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 10px;
`;
