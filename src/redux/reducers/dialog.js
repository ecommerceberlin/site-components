import { DIALOG_SHOW, DIALOG_HIDE } from '../../components/redux/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case DIALOG_SHOW:
      return action.payload;
      break;
    case DIALOG_HIDE:
      return {};
      break;
    default:
      return state;
  }
};

export default reducer;
