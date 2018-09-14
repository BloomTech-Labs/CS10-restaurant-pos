import styled from 'styled-components';

import { containerMixin, flexCenterMixin } from '../../global-styles/mixins';

export const Container = styled.div`
  border: 2px solid green;
  ${containerMixin}
`;

export const Content = styled.div`
  border: 2px solid blue;
  ${flexCenterMixin};
  justify-content: space-between;
  max-width: 950px;
  width: 100%;
  height: 700px;
`;
