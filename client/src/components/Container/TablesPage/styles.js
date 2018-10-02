import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const FreeFloorPlanContainer = styled.div`
  position: relative;
  display: flex;
  flex-grow: 2;
`;

export const Editor = styled.div`
  ${flexCenterMixin}
  flex-grow: 6;
`;

export const FloorPlanContainer = styled.div`
  flex-grow: 1;
  position: relative;
`;
