import styled from 'styled-components';

import { MainContainer } from '../../../global-styles/styledComponents';
import { checkbox } from '../../../global-styles/mixins';

export const Container = styled(MainContainer)`
  padding: 0;

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
  }
`;


export const CheckBox = styled.div`
  ${checkbox}
`;
