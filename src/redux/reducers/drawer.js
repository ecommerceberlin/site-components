import { DRAWER_SHOW, DRAWER_HIDE } from '../../components/redux/types';

const reducer = (state = false, action) => {
  switch (action.type) {
    case DRAWER_SHOW:
      return true;
      break;
    case DRAWER_HIDE:
      return false;
      break;
    default:
      return state;
  }
};

export default reducer;
