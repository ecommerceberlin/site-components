import _pick from 'lodash/pick';


import {
  ROLE_SELECT,
  ROLE_RESET,
  CART_ITEM_ADD,
  CART_ITEM_REMOVE,
  CART_RESET,
  REMOVE_USER_TOKEN,
  SET_USER_TOKEN,
  UUID_SET
} from '../../components/redux';

import {VENUE_SELECT, VENUE_SELECT_RESET} from '../../components/Schedule/redux'

import { CHANGE_LOCALE } from '../../i18n';

const defaultState = {
  role: '',
  cart: {},
  locale: "",
  locale_msgs: {},
  width: 'md',
  filterParams: {
    presenters: {}
  },
  selectedVenue : null,
  token: null,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case SET_USER_TOKEN:
      return {...state, token: action.token}
    break;

    case REMOVE_USER_TOKEN:
      return {...state, token: null}
    break;

    case 'SCREEN_SIZE_CHANGED':
      return { ...state, width: action.width };
    break;

    case CHANGE_LOCALE:
      return { ...state, locale: action.locale };
    break;

    case ROLE_SELECT:
      return { ...state, role: action.role };
    break;

    case ROLE_RESET:
      return { ...state, role: '' };
    break;

    case CART_ITEM_ADD:
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.ticketId]: {
            quantity: action.quantity,
            formdata: action.formdata
          }
        }
      };
      break;

    case CART_ITEM_REMOVE:
      return {
        ...state,
        cart: _pick(
          state.cart,
          Object.keys(state.cart).filter(
            ticketId => action.ticketId != ticketId
          )
        )
      };
      break;

    case CART_RESET:
      return { ...state, cart: {} };
      break;

    case VENUE_SELECT:
      return {...state, selectedVenue : action.name}
    break;

    case VENUE_SELECT_RESET:
      return {...state, selectedVenue : null}
    break;


    case UUID_SET:
      return {...state, uuid: action.payload}
    break;
    
    default:
      return state;
  }
};

export default reducer;
