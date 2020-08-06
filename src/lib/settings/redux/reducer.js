
import {
  SETTINGS_SET
} from './types' 

export const initialState = {
   
    widgets : {},

};

const reducer = (state = initialState, action) => {

  const { type, payload} = action;

  switch (type) {
    case SETTINGS_SET:
      return { ...state, ...payload };
    break;

    default:
      return state;
  }
};

export default reducer;
