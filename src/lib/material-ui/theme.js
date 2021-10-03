 
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

import { responsiveFontSizes, createTheme } from '@material-ui/core/styles';

//https://material-ui.com/customization/default-theme/?expend-path=$.typography

export const defaultTheme = {

  typography: {

    fontFamily: "'Lato', 'Helvetica', 'Arial', sans-serif",

    
    h4 : {
      fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
      fontWeight : 700
    },
    h3 : {
      fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
      fontWeight : 700
    },
    h1 : {
      fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
      fontWeight : 700
    },

    // headline : {
    //   fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
    // },
    // subheading : {
    //   fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
    //   fontWeight : 700
    // },
    // title: {
    //   fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif"
    // }
  },
  palette: {
    primary: { main: red[700] },
    secondary: { main: grey[700] },
    black: {main: "#000000"},
  }
};


const createThemeFunc = (theme = defaultTheme) => responsiveFontSizes(createTheme(theme));

export default createThemeFunc;
