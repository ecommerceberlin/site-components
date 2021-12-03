import merge from 'lodash/merge'

import {
  SETTINGS_SET
} from './types' 

export const initialState = {
   
};

const reducer = (state = initialState, action) => {

  const { type, payload} = action;

  switch (type) {
    case SETTINGS_SET:
      return Object.assign({}, merge(state, payload))
    break;

    default:
      return state;
  }
};

export default reducer;
