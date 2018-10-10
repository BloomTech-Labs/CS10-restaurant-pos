/* stylelint-disable value-list-max-empty-lines */
/* stylelint-disable declaration-colon-newline-after */
import styled from 'styled-components';

import { containerMixin, flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${flexCenterMixin};
  ${containerMixin};
  flex-direction: column;
  flex-shrink: 0;
  box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.7);
  background: ${(props) => props.theme.appTertiary};
  height: ${(props) => (props.membership ? '100px' : '150px')};

  /* styles dependent on whether the bar appears at the bottom or the top respectively */
  margin: ${(props) => (props.membership
    ? `
      0
      calc(5px - ${props.theme.mainContainerPaddingRightLeft})
      -${props.theme.mainContainerPaddingTopBottom}
      calc(5px - ${props.theme.mainContainerPaddingRightLeft})
      `
    : `
      -${props.theme.mainContainerPaddingTopBottom}
      -${props.theme.mainContainerPaddingRightLeft}
      calc(150px - ${props.theme.mainContainerPaddingTopBottom})
      -${props.theme.mainContainerPaddingRightLeft};`)};

  /* styles dependent on whether the bar appears at the bottom or the top respectively */
  border-radius:
    ${(props) => (props.membership
    ? `
      ${props.theme.cardBorderRadius}px
      ${props.theme.cardBorderRadius}px
      0
      0
      `
    : `
      0
      0
      ${props.theme.cardBorderRadius}px
      ${props.theme.cardBorderRadius}px`)};

  /* applies to when an admin is not subscribed the the bar appears on the top */
  ${(props) => !props.membership && 'width: 100%'};
`;
