import { RESOURCE_FETCH_SUCCESS, VOTE_STATUS_SUCCESS } from '../../components/redux/types';
import { CHANGE_LOCALE_MSGS } from '../../i18n';

import keyBy from 'lodash/keyBy'

const reducer = (state = {}, action) => {
  const { type, resource, data } = action;

  switch (type) {

    case RESOURCE_FETCH_SUCCESS:

      /**
       * experimental
       */

      if(resource === "posts" || resource === "publishers" || resource === "ticketowners" || resource === "tickets" || resource === "presenters"){
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
