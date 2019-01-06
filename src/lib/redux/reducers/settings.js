
export const initialState = {
    hero : {},
    ui : {
        menuItems : []
    },
    visitor : {},
    common : {},
    support : {
        title : '',
        description: '',
        people : []
    },
    rolebuttons : [],
    schedule : {
        times : {},
        venues : {},
        venueStyle : ""
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
