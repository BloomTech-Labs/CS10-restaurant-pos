import styled from 'styled-components';

import { Boxes } from '../../../global-styles/styledComponents';
import { flexCenterMixin } from '../../../global-styles/mixins';

export const ServerBox = styled(Boxes)`
  position: relative;
  padding: 25px;
  justify-content: space-between;

  &:hover {
    ${(props) => props.noHover && 'transform: none;'};
  }
`;

export const ProfilePic = styled.div`
  ${flexCenterMixin};
  border-radius: 50%;
  background: grey;
  height: 110px;
  width: 110px;
  overflow: hidden;
`;

export const DropDownDotsThing = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 50px;
  width: 30px;
  bottom: 30px;
  right: 30px;

  * {
    border-radius: 50%;
    height: 5px;
    width: 5px;
    background: ${(props) => props.theme.lightText};
    margin-bottom: 2px;
  }

  &:hover {
    * {
      background: black;
    }
  }
`;

export const DropdownThingy = styled.div`
  position: absolute;
  z-index: 10;
  bottom: -50px;
  right: -50px;
  height: 100px;
  width: 100px;
  background: ${(props) => props.theme.appPrimary};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: ${(props) => props.theme.btnBorderRadius}px;
  display: ${(props) => !props.show && 'none'};
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: ${(props) => !props.show && 'none'};
`;
