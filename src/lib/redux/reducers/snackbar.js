import { SNACKBAR_SHOW, SNACKBAR_HIDE } from '../../components/redux/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SNACKBAR_SHOW:
      return action.payload;
      break;
    case SNACKBAR_HIDE:
      return {};
      break;
    default:
      return state;
  }
};

export default reducer;
