import styled from 'styled-components';

import { MainContainer } from '../../../global-styles/styledComponents';
import { flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubContainer = styled.div`
  ${flexCenterMixin};
  flex-direction: column;
  position: fixed;
  width: 375px;
  right: 0;
  left: 50%;
  margin-top: 100px;
  margin-left: calc(375px / -2);
`;

export const Text = styled.div`
  font-size: ${(props) => props.theme.h1}rem;
  color: ${(props) => props.theme.primaryText};
  margin-top: ${(props) => props.uponLogin && '45px'};
  text-align: ${(props) => props.uponLogin && 'center'};
`;

export const PinContainer = styled.div`
  font-size: 6rem;
  width: 200px;
  text-align: center;
  background: ${(props) => props.theme.primaryText};
  padding: 20px;
  margin: 30px 0;
  border-radius: 10px;
  border: 1px solid slategrey;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.4);
  color: transparent;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.3);
  background-clip: text;
  /* stylelint-disable property-no-vendor-prefix */
  -webkit-background-clip: text;
  -moz-background-clip: text;
  /* stylelint-enable property-no-vendor-prefix */

  &:hover {
    cursor: pointer;
  }
`;

export const LinkDiv = styled.div`
  margin-top: 20px;
`;
