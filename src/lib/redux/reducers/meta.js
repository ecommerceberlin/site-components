import { RESOURCE_FETCH_SUCCESS_META } from '../../components/redux/types';

export const initialState = {

};


const reducer = (state = initialState, action) => {
  const { type, meta} = action;

  switch (type) {
    case RESOURCE_FETCH_SUCCESS_META:
      return { ...state, ...meta };
    break;

    default:
      return state;
  }
};

export default reducer;
