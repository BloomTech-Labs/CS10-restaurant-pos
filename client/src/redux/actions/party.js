import axios from 'axios';

import serverURI from '../../config/URI';

export const SAVE_ORDER = 'SAVE_ORDER';
export const SAVE_SPLIT_ORDER = 'SAVE_SPLIT_ORDER';
export const LOADING_PARTIES = 'LOADING_PARTIES';
export const LOADING_PARTIES_SUCCESS = 'LOADING_PARTIES_SUCCESS';
export const LOADING_PARTIES_ERROR = 'LOADING_PARTIES_ERROR';
export const LOADING_PARTY = 'LOADING_PARTY';
export const LOADING_PARTY_SUCCESS = 'LOADING_PARTY_SUCCESS';
export const LOADING_PARTY_ERROR = 'LOADING_PARTY_ERROR';
export const CREATE_PARTY = 'CREATE_PARTY';
export const ADDING_PARTY = 'ADDING_PARTY';
export const ADDING_PARTY_SUCCESS = 'ADDING_PARTY_SUCCESS';
export const ADDING_PARTY_ERROR = 'ADDING_PARTY_ERROR';
export const UPDATING_PARTY = 'UPDATING_PARTY';
export const UPDATING_PARTY_SUCCESS = 'UPDATING_PARTY_SUCCESS';
export const UPDATING_PARTY_ERROR = 'UPDATING_PARTY_ERROR';
export const DELETING_PARTY = 'DELETING_PARTY';
export const DELETING_PARTY_SUCCESS = 'DELETING_PARTY_SUCCESS';
export const DELETING_PARTY_ERROR = 'DELETING_PARTY_ERROR';
export const CLEAR_PARTY = 'CLEAR_PARTY';

// Saves the Order on the ScratchPad
export const createParty = (tables, push) => {
  push('/party');
  return {
    type: CREATE_PARTY,
    payload: tables
  };
};

// Saves the Order on the ScratchPad
export const saveOrder = (order) => ({
  type: SAVE_ORDER,
  payload: order
});

// Saves the Split Order on the Modal
export const saveSplitOrder = (splitOrder) => ({
  type: SAVE_SPLIT_ORDER,
  payload: splitOrder
});

// Gets all Parties: server (name), food (name, price), and tables
export const getParties = () => (dispatch) => {
  dispatch({ type: LOADING_PARTIES });
  axios
    .get(`${serverURI}/api/party/all`)
    .then((res) => {
      dispatch({ type: LOADING_PARTIES_SUCCESS, payload: res.data.parties });
    })
    .catch((err) => {
      dispatch({ type: LOADING_PARTIES_ERROR, payload: err });
    });
};

// Gets a Party: server (name), food (name, price), and tables
export const getParty = (id) => (dispatch) => {
  dispatch({ type: LOADING_PARTY });
  axios
    .get(`${serverURI}/api/party/${id}`)
    .then((res) => {
      dispatch({ type: LOADING_PARTY_SUCCESS, payload: res.data.party });
    })
    .catch((err) => {
      dispatch({ type: LOADING_PARTY_ERROR, payload: err });
    });
};

// Creates a Party: it must send in an object containing tables and a server
export const addParty = (party) => (dispatch) => {
  dispatch({ type: ADDING_PARTY });
  axios
    .post(`${serverURI}/api/party/add`, party)
    .then((res) => {
      dispatch({ type: ADDING_PARTY_SUCCESS, payload: res.data.party });
    })
    .catch((err) => {
      dispatch({ type: ADDING_PARTY_ERROR, payload: err });
    });
};

// Edits a Party: it must send in an id and an object
// containing what it wants to change (server, food, tables)
export const updateParty = (id, updatedInfo) => (dispatch) => {
  dispatch({ type: UPDATING_PARTY });
  axios
    .put(`${serverURI}/api/party/update/${id}`, updatedInfo)
    .then((res) => {
      dispatch({ type: UPDATING_PARTY_SUCCESS, payload: res.data.updatedParty });
    })
    .catch((err) => {
      dispatch({ type: UPDATING_PARTY_ERROR, payload: err });
    });
};

// Deletes a Party: it must send in an id for deletion
// Recieves: { removedParty, msg: 'Party has been removed.' }
export const deleteParty = (id) => (dispatch) => {
  dispatch({ type: DELETING_PARTY });
  axios
    .delete(`${serverURI}/api/party/delete/${id}`)
    .then((res) => {
      dispatch({ type: DELETING_PARTY_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: DELETING_PARTY_ERROR, payload: err });
    });
};

export const clearParty = () => ({
  type: CLEAR_PARTY,
});
