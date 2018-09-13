import React from 'react';
// ! Added for testing ------------------------
import { connect } from 'react-redux';

import {
  getParties,
  getParty,
  addParty,
  updateParty,
  deleteParty,
} from '../../redux/actions/party';
// ! ------------------------------------------

class Landing extends React.Component {
  // ! Added for testing ------------------------
  componentDidMount() {
    this.props.getParties(); // eslint-disable-line
  }
  // ! ------------------------------------------

  render() {
    return (
      <div className="App">
        <h1>Landing</h1>
      </div>
    );
  }
}

// ! Added for testing ------------------------
const mapStateToProps = (state) => ({
  party: state.party.party,
  partyList: state.party.partyList,
  loading: state.party.loading,
  deletedPayload: state.party.deletedPayload,
});

export default connect(
  mapStateToProps,
  {
    getParties,
    getParty,
    addParty,
    updateParty,
    deleteParty,
  }
)(Landing);
// ! ------------------------------------------

// export default Landing;
