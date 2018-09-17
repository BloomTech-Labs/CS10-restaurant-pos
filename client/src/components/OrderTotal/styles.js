import styled from 'styled-components';

import { flexCenterMixin } from '../../global-styles/mixins';

export const Display = styled.div`
  ${flexCenterMixin};
  flex-direction: column;
  text-justify: right;

  * {
    display: flex;
    justify-content: flex-end;
    width: 70%;
  }
`;
