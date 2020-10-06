import { 
  FAQ_TOGGLE, 
  FAQ_URL, 
  PAGE_LOADING_START, 
  PAGE_LOADING_END, 
  DRAWER_SHOW, 
  DRAWER_HIDE,
  DIALOG_SHOW, 
  DIALOG_HIDE,
  SNACKBAR_SHOW, 
  SNACKBAR_HIDE
} from '../../components/redux';

const reducer = (state = { faqs: [], loading: false, drawer: false, dialog: {}, snackbar: {} }, action) => {

switch (action.type) {
  
  case FAQ_URL:
  return { ...state, faqs: [...state.faqs, ...action.labels] };
  break;

  case FAQ_TOGGLE:
    if (action.state) {
      return { ...state, faqs: [...state.faqs, ...action.labels] };
    }
    return {
      ...state,
      faqs: state.faqs.filter(item => action.labels.indexOf(item) === -1)
    };
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
  
  case DIALOG_HIDE:
    return {...state, dialog: {}};
  break;

  case SNACKBAR_SHOW:
  return {...state, snackbar: action.payload};
  break;

  case SNACKBAR_HIDE:
  return {...state, snackbar: {}};
  break;


  default:
  return state;
  }
};

export default reducer;
