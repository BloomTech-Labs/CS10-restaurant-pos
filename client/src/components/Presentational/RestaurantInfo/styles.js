import styled from 'styled-components';

import { containerMixin, flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${containerMixin};
  flex-direction: column;
`;

export const Form = styled.form`
  ${flexCenterMixin};
  flex-direction: column;
`;
