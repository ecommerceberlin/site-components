import { RESOURCE_LIST } from '../../components/redux/types';

const reducer = (state = {}, action) => {
  
  const { type, endpoint, data } = action;

  switch (type) {

    case RESOURCE_LIST:
      return { ...state, [endpoint]: data };
    break;

    default:
      return state;
  }
};

export default reducer;
