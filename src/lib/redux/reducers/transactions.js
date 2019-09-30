import { 
    VOTE_STATUS_ERROR, 
    VOTE_STATUS_CHECK,
    VOTE_REQUESTED,
    LINKEDIN_VOTE_REQUESTED,
    LINKEDIN_VOTE_ERROR } from '../../components/redux/types';

const defaultState = {
    voting: {},
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

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