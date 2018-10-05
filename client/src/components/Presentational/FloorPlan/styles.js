import styled from 'styled-components';

import { MainContainer } from '../../../global-styles/styledComponents';
import { checkbox, flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled(MainContainer)`
  padding: 0;

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
  }
`;


export const CheckBox = styled.div`
  ${checkbox}
`;

export const Lock = styled.div`
  ${flexCenterMixin};
  position: fixed;
  right: 50px;
  top: 150px;
  user-select: none;
  background: ${(props) => props.theme.appPrimary};
  box-shadow: ${(props) => props.theme.boxShadow};
  height: 50px;
  padding-right: 20px;
  border-radius: 30px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${(props) => props.theme.contentBackground};
  }
`;

export const Zoom = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  position: fixed;
  width: 50px;
  height: 100px;
  right: 50px;
  bottom: 50px;
  background: ${(props) => props.theme.appPrimary};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 30px;
`;

export const ZoomButtons = styled.div`
  ${flexCenterMixin};
  flex-grow: 1;
  font-size: 2.5rem;
  width: 100%;
  transition: background 0.2s ease-in-out;

  &:nth-child(1) {
    border-radius: 30px 30px 0 0;
    border-bottom: 2px solid ${(props) => props.theme.contentBackground};
  }

  &:nth-child(2) {
    border-radius: 0 0 30px 30px;
  }

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.contentBackground};
  }

  &:active {
    background: ${(props) => props.theme.lightText};
  }
`;
