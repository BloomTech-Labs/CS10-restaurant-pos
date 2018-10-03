import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const Display = styled.div`
  ${flexCenterMixin};
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 50%;
  padding-top: 20px;
  border-top: 1px solid ${(props) => props.theme.lightTextOnDark};
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  color: ${(props) => props.theme.lightTextOnDark};

  * {
    font-weight: 300;
  }
`;

export const Amount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;

  * {
    display: flex;
    justify-content: flex-end;
  }
`;
