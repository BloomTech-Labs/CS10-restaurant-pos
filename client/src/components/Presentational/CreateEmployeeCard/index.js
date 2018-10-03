import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

class CreateEmployeeCard extends React.Component {
  render() {
    return (
      <s.Container>
        <div>CreateEmployeeCard</div>
        <s.ButtonContainer>
          <Link to="/new-employee">
            <Button type="button">
              Create Employee
            </Button>
          </Link>
        </s.ButtonContainer>
      </s.Container>
    );
  }
}

export default CreateEmployeeCard;
