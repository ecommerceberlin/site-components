import { DIALOG_SHOW, DIALOG_HIDE } from '../../components/redux/types';


export const initialState = {
    
    facebook : {
      
    },
    linkedin : {
        
    },
    twitter : {

    }
};

const reducer = (state = initialState, action) => {

  const { type, payload} = action;

  switch (type) {
    case "SETTINGS_SET":
      return { ...state, ...payload };
    break;

    default:
      return state;
  }
};

export default reducer;
