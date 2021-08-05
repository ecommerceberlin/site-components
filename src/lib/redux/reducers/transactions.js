import { 
    VOTE_STATUS_ERROR, 
    VOTE_STATUS_CHECK,
    VOTE_REQUESTED,
    LINKEDIN_VOTE_REQUESTED,
    LINKEDIN_VOTE_ERROR,
    USER_INTERACTED_WITH
  } from '../../components/redux/types';

import {
  FORM_ACTION_FINISHED
} from '../../formik/redux/types'

const defaultState = {
    interacted: [],
    voting: {},
    forms: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case USER_INTERACTED_WITH:
      return {...state, interacted: [...new Set([...state.interacted, ...action.name])] }
    break;
    case FORM_ACTION_FINISHED:

      return {...state, forms: [...state.forms, action.payload ]}

    break;

    case LINKEDIN_VOTE_REQUESTED:
    case VOTE_STATUS_CHECK:
    case VOTE_REQUESTED:
    //reset our shit...
    return {...state, voting : {}}
    break;

    case LINKEDIN_VOTE_ERROR:
    case VOTE_STATUS_ERROR:
      return {...state, voting : {"code" : action.code, "message" : action.message}}
    break;

    default:
      return state;
  }
};

export default reducer;