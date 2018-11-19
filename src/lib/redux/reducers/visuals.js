import { FAQ_TOGGLE, FAQ_URL } from '../../components/redux';

const reducer = (state = { faqs: [] }, action) => {
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

    default:
      return state;
  }
};

export default reducer;
