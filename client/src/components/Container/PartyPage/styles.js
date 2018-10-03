import styled from 'styled-components';

import { modalBlur } from '../../../global-styles/mixins';
import { MainContainer } from '../../../global-styles/styledComponents';

export const Container = styled(MainContainer)`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-grow: 2;
  width: 100%;
  padding: 0;
  ${(props) => props.modalOpen && modalBlur};
`;
