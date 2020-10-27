import { RESOURCE_LIST } from '../../components/redux/types';

const reducer = (state = {}, action) => {
  
  const { type, endpoint, data } = action;

  switch (type) {

    case RESOURCE_LIST:

      const ids = data.map(item => item.id)

      return { ...state, [endpoint]: ids };
    break;

    default:
      return state;
  }
};

export default reducer;
