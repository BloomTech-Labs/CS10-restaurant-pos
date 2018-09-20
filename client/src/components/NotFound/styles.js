import styled from 'styled-components';

import { buttonMixin } from '../../global-styles/mixins';

export const Test = styled.div`
  color: ${props => props.theme.contentBackground};
`;

export const Button = styled.button`
  ${buttonMixin};
`;

export const Bg = styled.div`
  background: red;
`;
