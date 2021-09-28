import { 
  FAQ_TOGGLE, 
  FAQ_URL, 
  PAGE_LOADING_START, 
  PAGE_LOADING_END, 
  DRAWER_SHOW, 
  DRAWER_HIDE,
  DIALOG_SHOW, 
  DIALOG_TITLE_CHANGE,
  DIALOG_SAVE,
  DIALOG_REVERT,
  DIALOG_HIDE,
  SNACKBAR_SHOW, 
  SNACKBAR_HIDE,
  PAGE_ACTION_SHOW,
  PAGE_ACTION_HIDE,
  BOOTH_SELECT
} from '../../components/redux';

const reducer = (state = { faqs: [], loading: false, drawer: false, dialog: {}, dialog_backup: {}, snackbar: {}, page_action: null, booths: [] }, action) => {

switch (action.type) {
  
  case FAQ_URL:
  return { ...state, faqs: [...new Set([...state.faqs, ...action.labels])] };
  break;

  case FAQ_TOGGLE:

    //adding
    if (action.state) {
      return { ...state, faqs: [...new Set([...state.faqs, ...action.labels])] };
    }

    //removing
    return {...state, faqs: state.faqs.filter(item => action.labels.indexOf(item) === -1) };
  break;

  case PAGE_LOADING_START:
    return {...state, loading: true}
  break;

  case PAGE_LOADING_END:
    return {...state, loading: false}
  break;

  case DRAWER_SHOW:
    return {...state, drawer: true}
  break;

  case DRAWER_HIDE:
    return {...state, drawer: false}
  break;

  case DIALOG_SHOW:
    return {...state, dialog: action.payload};
  break;

  case DIALOG_TITLE_CHANGE:
    return {...state, dialog: {...state.dialog, title: action.payload}}
  break;
  
  case DIALOG_SAVE:
    return {...state, dialog_backup: state.dialog};
  break;
  
  case DIALOG_REVERT:
    return {...state, dialog: state.dialog_backup};
  break;

  case DIALOG_HIDE:
    return {...state, dialog: {}};
  break;

  case SNACKBAR_SHOW:
  return {...state, snackbar: action.payload};
  break;

  case SNACKBAR_HIDE:
  return {...state, snackbar: {}};
  break;


  case PAGE_ACTION_SHOW:
  return {...state, page_action: action.payload};
  break;

  case PAGE_ACTION_HIDE:
  return {...state, page_action: null};
  break;

  case BOOTH_SELECT:
    return {...state, booths: action.payload}
  break;

  default:
  return state;
  }
};

export default reducer;
