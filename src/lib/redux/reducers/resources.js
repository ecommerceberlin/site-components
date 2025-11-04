import { RESOURCE_FETCH_SUCCESS, VOTE_STATUS_SUCCESS, LOCK_SUCCESS, LOCK_FAILED } from '../../components/redux/types';
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

    case LOCK_SUCCESS:
      /**
       * CRITICAL FIX: Immediately update blockings when current user acquires a lock
       * This prevents race condition where user's own lock isn't visible until Pusher fires
       * Backend returns ALL current blockings, so we replace (not merge)
       */
      return { ...state, blockings: action.data };
    break;

    case LOCK_FAILED:
      /**
       * CRITICAL FIX: Update blockings when lock fails
       * Backend returns current blockings showing who has the lock
       * This helps user see why their lock attempt failed
       */
      return { ...state, blockings: action.data };
    break;

    default:
      return state;
  }
};

export default reducer;
