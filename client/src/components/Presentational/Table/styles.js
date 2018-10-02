import styled from 'styled-components';

import { Boxes } from '../../../global-styles/styledComponents';

export const TableBox = styled(Boxes)`
  background: ${(props) => props.theme.appSecondary};
  color: ${(props) => props.theme.appPrimary};
  opacity: ${(props) => (props.active ? '0.5' : '1')};
`;
