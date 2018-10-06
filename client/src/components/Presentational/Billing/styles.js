import styled from 'styled-components';

import { containerMixin, flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${flexCenterMixin};
  ${containerMixin};
  flex-direction: column;
  height: 100px;
  width: 100%;
  margin:
    0
    calc(5px - ${(props) => props.theme.mainContainerPaddingRightLeft})
    -${(props) => props.theme.mainContainerPaddingTopBottom}
    calc(5px - ${(props) => props.theme.mainContainerPaddingRightLeft});
  border-radius:
    ${(props) => props.theme.cardBorderRadius}px
    ${(props) => props.theme.cardBorderRadius}px 0 0;
  box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.7);
  background: ${(props) => props.theme.appTertiary};
`;
