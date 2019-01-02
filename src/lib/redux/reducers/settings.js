
export const initialState = {
    support : {

        title : 'event.support.hello',
        description: 'event.support.description',
      
        people : [
          {
            name: 'Adam Zygadlewicz',
            position : '',
            langs : [],
            avatar: '/static/support.jpg',
            phone: '+48 721 945 134',
            email: 'hello@targiehandlu.pl',
            chatlio : true
          }
        ]
       
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
