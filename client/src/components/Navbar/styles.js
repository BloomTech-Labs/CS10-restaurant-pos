import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { modalBlur } from '../../global-styles/mixins';
import { topbarHeight } from '../../global-styles/variables';

export const Navbar = styled.nav`
  padding-right: 20px;
  width: 100%;
  height: ${topbarHeight}px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: red;
  ${(props) => props.modalIsOpen && modalBlur};
`;

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 10px;
`;
