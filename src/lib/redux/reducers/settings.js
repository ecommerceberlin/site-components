
export const initialState = {
    bookingmap : {
        height : 750
    },
    reviews : {
        
    },
    hero : {},
    ui : {
        menuItems : []
    },
    visitor : {},
    common : {},
    sales_support : {
        title : '',
        description: '',
        people : []
    },
    customer_support : {

    },
    rolebuttons : [],
    schedule : {
        times : {},
        venues : {},
        venueStyle : ""
    },
    footer : {
        links : []
    },
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
