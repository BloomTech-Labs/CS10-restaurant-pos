import styled from 'styled-components';

import { Boxes } from '../../../global-styles/styledComponents';
import { flexCenterMixin } from '../../../global-styles/mixins';

export const ServerBox = styled(Boxes)`
  /* 888888888888888 */
`;

export const ProfilePic = styled.div`
  ${flexCenterMixin};
  border-radius: 50%;
  background: grey;
  height: 125px;
  width: 125px;
  overflow: hidden;
  margin-top: 18px;/* Temporary style: */
`;
