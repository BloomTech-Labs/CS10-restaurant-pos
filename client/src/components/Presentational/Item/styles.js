import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';
import { Boxes } from '../../../global-styles/styledComponents';

export const ItemBoxes = styled(Boxes)`
  padding-top: 0;
  overflow: hidden;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  flex-grow: 1;
`;

export const ItemPic = styled.div`
  ${flexCenterMixin};
  background: grey;
  height: 120px;
  width: 100%;
  overflow: hidden;
`;

export const ItemTitle = styled(Item)`
  ${flexCenterMixin};
  font-size: ${(props) => props.theme.ItemTitleSize}rem;
`;

export const ItemDescription = styled(Item)`
  ${flexCenterMixin};
  font-size: ${(props) => props.theme.ItemTitlePrice}rem;
`;

export const ItemPrice = styled(Item)`
  ${flexCenterMixin};
  font-weight: 300;
  font-size: ${(props) => props.theme.ItemPriceSize}rem;
`;
