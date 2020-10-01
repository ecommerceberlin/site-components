 
import {
  LINKEDIN_TOKEN_SUCCESS,
  LINKEDIN_TOKEN_RESET
} from '../../components/redux';

export const initialState = {
    
    facebook : null,
    linkedin : null,
    twitter :  null
};

const reducer = (state = initialState, action) => {

  const { type, payload} = action;

  switch (type) {

    case LINKEDIN_TOKEN_SUCCESS:
      return {...state, linkedin: action.uid};
    break;

    case LINKEDIN_TOKEN_RESET:
      return {...state, linkedin : null};
    break;

    default:
      return state;
  }
};

export default reducer;
