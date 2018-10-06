import styled from 'styled-components';

import { containerMixin, card, flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${flexCenterMixin};
  ${containerMixin};
  ${card};
  flex-direction: column;
  justify-content: space-evenly;
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
`;
