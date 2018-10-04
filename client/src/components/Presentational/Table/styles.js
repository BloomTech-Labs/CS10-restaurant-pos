import styled from 'styled-components';

import { Boxes } from '../../../global-styles/styledComponents';
import { flexCenterMixin } from '../../../global-styles/mixins';

export const TableBox = styled(Boxes)`
  ${flexCenterMixin};
  padding: 0;
  font-size: ${(props) => props.theme.freeTableNumberSize}rem;
  background: ${(props) => (props.selected ? props.theme.selectedTable : props.theme.appSecondary)};
  color: ${(props) => props.theme.appPrimary};
  opacity: ${(props) => ((props.active && !props.highlighted) ? '0.5' : '1')};
  ${(props) => props.highlighted && 'border: 5px solid black'};
`;
