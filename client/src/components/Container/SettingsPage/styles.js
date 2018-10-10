import styled from 'styled-components';

import { MainContainer } from '../../../global-styles/styledComponents';
import { containerMixin, flexCenterMixin, modalBlur } from '../../../global-styles/mixins';

export const Container = styled(MainContainer)`
  ${containerMixin};
  flex-direction: column;
  overflow-y: auto;
  ${(props) => props.modalOpen && modalBlur};
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  flex-shrink: 0;
`;

export const Price = styled.div`
  ${flexCenterMixin};
  margin: 0;
  font-size: 4.5rem;

  &::before {
    content: '$';
  }

  &::after {
    content: '.00';
  }

  &::before,
  &::after {
    font-size: 2.5rem;
  }
`;
