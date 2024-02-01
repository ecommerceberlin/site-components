import { RESOURCE_FETCH_SUCCESS, VOTE_STATUS_SUCCESS } from '../../components/redux/types';
import { CHANGE_LOCALE_MSGS } from '../../i18n';

import keyBy from 'lodash/keyBy'

const keyableResources = [
  "posts",
  "publishers",
  "ticketowners",
  "tickets",
  "presenters",
  "contestant_companies_all",
  "jurors",
  "jurors_all",
  "ranking",
  "prizes",
  "report",
  "exhibitors2",
  "companies2",
  "purchases",
  "workshopers",
  "planner",
  "callforpapers2"
]

const reducer = (state = {
  texts: {}
}, action) => {
  const { type, resource, data } = action;

  switch (type) {

    case RESOURCE_FETCH_SUCCESS:

      /**
       * experimental
       */

      if(keyableResources.includes(resource)){
        const keyed = keyBy(data, "id");
        return {...state, [resource]: {...state[resource], ...keyed}}     
      }

      //simple replace for old-type resources...
      return { ...state, [resource]: data };
    break;

    case VOTE_STATUS_SUCCESS:
      return { ...state, "votes" : data};
    break;

    case CHANGE_LOCALE_MSGS:
        return { ...state, texts: action.messages };
    break;

    default:
      return state;
  }
};

export default reducer;
