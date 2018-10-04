import {
  SAVE_ORDER,
  SAVE_SPLIT_ORDER,
  TOGGLE_SPLIT_ITEM,
  LOADING_PARTIES,
  LOADING_PARTIES_SUCCESS,
  LOADING_PARTY,
  LOADING_PARTY_SUCCESS,
  CREATE_PARTY,
  ADDING_PARTY,
  ADDING_PARTY_SUCCESS,
  UPDATING_PARTY,
  UPDATING_PARTY_SUCCESS,
  DELETING_PARTY,
  DELETING_PARTY_SUCCESS,
  CLEAR_SELECTED
} from '../actions/party';
import { CLEAR_ORDER_CLIENT } from '../actions/payments';
import { DEACTIVATING_TABLE_SUCCESS } from '../actions/tables';
import { CLEAR_SPLIT_ORDER, REMOVE_SPLIT_ORDER_FROM_ORDER } from '../actions/modal';

const initialState = {
  tables: [],
  order: [],
  splitOrder: [],
  fetchedParty: {},
  partyList: [],
  loading: false
};

const PartyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ORDER:
      return { ...state, order: action.payload };

    case SAVE_SPLIT_ORDER:
      return { ...state, splitOrder: action.payload };

    case TOGGLE_SPLIT_ITEM:
      const item = action.payload; // eslint-disable-line no-case-declarations

      if (state.splitOrder.find((element) => element.uniqueId === item.uniqueId)) {
        return {
          ...state,
          splitOrder: state.splitOrder.filter((element) => element.uniqueId !== item.uniqueId)
        };
      }
      return {
        ...state,
        splitOrder: [...state.splitOrder, item]
      };

    case LOADING_PARTIES:
      return { ...state, loading: true };

    case LOADING_PARTIES_SUCCESS:
      return { ...state, loading: false, partyList: action.payload };

    case LOADING_PARTY:
      return { ...state, loading: true };

    case LOADING_PARTY_SUCCESS:
      return { ...state, loading: false, fetchedParty: action.payload };

    case CREATE_PARTY:
      return { ...state, tables: action.payload };

    case ADDING_PARTY:
      return { ...state, loading: true };

    case ADDING_PARTY_SUCCESS:
      return {
        ...state,
        loading: false,
        partyList: [...state.partyList, action.payload]
      };

    case UPDATING_PARTY:
      return { ...state, loading: true };

    case UPDATING_PARTY_SUCCESS:
      return {
        ...state,
        loading: false,
        partyList: state.partyList.map((party) => {
          if (party._id === action.payload._id) return action.payload;
          return party;
        })
      };

    case DELETING_PARTY:
      return { ...state, loading: true };

    case DELETING_PARTY_SUCCESS:
      return {
        ...state,
        loading: false,
        partyList: state.partyList.filter((party) => party._id !== action.payload.removedParty._id)
      };

    // ? Should we add the populatedParty to state.fetchedParty?
    case DEACTIVATING_TABLE_SUCCESS:
      const { populatedParty } = action.payload; // eslint-disable-line no-case-declarations
      return {
        ...state,
        partyList: state.partyList.map((party) => {
          if (party._id === populatedParty._id) return populatedParty;
          return party;
        })
      };

    case CLEAR_SELECTED:
      return { ...initialState, partyList: state.partyList };

    case CLEAR_SPLIT_ORDER:
      return {
        ...state,
        splitOrder: []
      };

    case REMOVE_SPLIT_ORDER_FROM_ORDER:
      return {
        ...state,
        order: state.order
          .filter((element) => !state.splitOrder
            .find((splitItem) => element.uniqueId === splitItem.uniqueId))
      };

    case CLEAR_ORDER_CLIENT:
      return {
        ...state,
        order: []
      };
      // return {
      //   order: state.order.filter(
      //     element => !state.splitOrder.find(split => split.uniqueId === element.uniqueId)
      //   )
      // };

    default:
      return state;
  }
};

export default PartyReducer;
