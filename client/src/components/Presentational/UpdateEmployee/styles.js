import styled from 'styled-components';

import { containerMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${containerMixin}
  flex-direction: column;
  width: 100%;
`;

export const Titles = styled.div`
  width: 100%;
  border-bottom: 1.5px solid grey;
  padding: 15px 0 0 0;
`;
