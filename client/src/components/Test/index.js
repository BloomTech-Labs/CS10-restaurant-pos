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

class Test extends React.Component {
  // ! Added for testing ------------------------
  state = { displayFlag: false };
  componentDidMount() {
    this.props.getParties();
  }

  displayParty = () => {
    this.props.getParty(this.props.partyList[0]._id);
    this.setState({ displayFlag: true });
  };

  // ! ------------------------------------------

  render() {
    return (
      <div className="App">
        <h1>Test</h1>
        <br />
        {this.props.partyList
          ? this.props.partyList.map((each, i) => {
              console.log(each);
              return (
                <div key={each._id}>
                  _id of Party {i}: {each._id}
                  <div>
                    <div>This party is served by {each.server.name}</div>
                    <div>It contains:</div>
                    <div>
                      {each.tables.length} table(s) and {each.food.length} food
                      orders
                    </div>
                  </div>
                  <button onClick={() => this.props.deleteParty(each._id)}>
                    Click here to delete this party
                  </button>
                  <br />
                  <button
                    onClick={() =>
                      this.props.updateParty(each._id, {
                        server: '5b99c12dd78c33ba9c717ff0',
                      })
                    }
                  >
                    Click here to change the server to First Last
                  </button>
                  <br />
                  <br />
                </div>
              );
            })
          : null}
        <br />
        <button
          onClick={() =>
            this.props.addParty({
              tables: ['5b99a5d5603385aece3e367a'],
              server: '5b993879366d2671bcba0e02',
            })
          }
        >
          Click here to add a party served by Rigby
        </button>
        <br />
        <br />
        <button onClick={this.displayParty}>
          Click here to `get` and display the first party's _id
        </button>
        <br />
        {this.state.displayFlag && this.props.party._id}
      </div>
    );
  }
}

// ! Added for testing ------------------------
const mapStateToProps = (state) => ({
  party: state.party.fetchedParty,
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
)(Test);
// ! ------------------------------------------

// export default Landing;
