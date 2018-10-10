import styled from 'styled-components';

import { MainContainer } from '../../../global-styles/styledComponents';
import { flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled(MainContainer)`
  ${flexCenterMixin};
  font-size: ${(props => props.theme.h1)}rem;
  color: ${(props) => props.theme.primaryText};
`;
