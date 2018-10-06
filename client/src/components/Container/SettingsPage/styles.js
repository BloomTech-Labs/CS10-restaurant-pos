import styled from 'styled-components';

import { MainContainer } from '../../../global-styles/styledComponents';
import { containerMixin, modalBlur } from '../../../global-styles/mixins';

export const Container = styled(MainContainer)`
  ${containerMixin};
  flex-direction: column;
  overflow-y: auto;
  ${(props) => props.modalOpen && modalBlur};
  height: 100%;
`;

export const CardContainer = styled.div`
  border: 3px solid green;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;
