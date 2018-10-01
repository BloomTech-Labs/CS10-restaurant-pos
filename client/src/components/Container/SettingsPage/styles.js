import styled from 'styled-components';

import { containerMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${containerMixin};
  flex-wrap: wrap;
  overflow-y: auto;
`;
