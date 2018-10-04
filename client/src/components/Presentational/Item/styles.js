import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';
import { Boxes } from '../../../global-styles/styledComponents';

export const ItemBoxes = styled(Boxes)`
  padding-top: 0;
`;

export const Item = styled.div`
  padding-bottom: 5px;
`;

export const ItemPic = styled.div`
  ${flexCenterMixin};
  background: grey;
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin-top: 18px;/* Temporary style: */
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
