import styled from 'styled-components';

import { Boxes } from '../../global-styles/styledComponents';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
`;

export const ItemBoxes = styled(Boxes)`
  /* Styles modifications go here */
`;

export const Item = styled.div`
  padding-bottom: 5px;
`;

export const ItemTitle = styled(Item)`
  font-size: ${(props) => props.theme.ItemTitleSize}rem;
`;

export const ItemDescription = styled(Item)`
  font-size: ${(props) => props.theme.ItemTitlePrice}rem;
`;

export const ItemPrice = styled(Item)`
  font-size: ${(props) => props.theme.ItemTitleSize}rem;
`;
