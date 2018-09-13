/* eslint-disable */ // ! Added for testing ---
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
    this.props.getParties();
  }
  // ! ------------------------------------------

  render() {
    return (
      <div className="App">
        <h1>Landing</h1>
        {this.props.partyList
          ? this.props.partyList.map((each) => {
            console.log(each);
            return <div>Each party goes here</div>;
          })
          : null}
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
