import {
  BOOTH_SELECT,
  BOOTH_UNSELECT,
  BOOTHS_RESET
} from '../../components/redux/types';

const reducer = (state = [], action) => {
  //  const arr = state

  switch (action.type) {
    /*prevent double select*/
    case BOOTH_SELECT:
      if (state.indexOf(action.payload) > -1) {
        return state;
      }
      return [...state, action.payload];
      break;
    case BOOTH_UNSELECT:
      return [...state.filter(item => item !== action.payload)];
      break;
    case BOOTHS_RESET:
      return [];
      break;
    default:
      return state;
  }
};

export default reducer;
