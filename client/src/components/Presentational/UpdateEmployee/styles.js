import styled from 'styled-components';

import { containerMixin, flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${containerMixin}
  flex-direction: column;
`;

export const Form = styled.form`
  ${flexCenterMixin}
  flex-direction: column;
`;

export const Titles = styled.div`
  width: 100%;
  border-bottom: 1.5px solid grey;
  padding: 15px 0 0 0;
`;
