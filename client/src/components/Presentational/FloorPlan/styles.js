import styled from 'styled-components';

import { MainContainer } from '../../../global-styles/styledComponents';

export const Container = styled(MainContainer)`
  padding: 0;

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
  }
`;
