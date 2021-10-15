import React, { useEffect, useState } from 'react';
import Router, {useRouter} from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import  {createTheme, defaultTheme}  from '../material-ui';
//import { reduxWrapper} from '../redux';
// import * as gtag from '../services/gtag';
import {TranslationProvider} from '../i18n';
import Layout from '../layouts/LayoutMain'

import { connect } from 'react-redux';
import GoogleTagManager from '../components/GoogleTagManager'
import PageLoadingIndicator from '../components/PageLoadingIndicator'


export function reportWebVitals(metric) {
//  if (metric.label === 'web-vital') {
    //console.log(metric) // The metric object ({ id, name, startTime, value, label }) is logged to the console
//  }
}

const WrappedApp = ({Component, pageProps, head, theme, layout=true, router}) => {

 

  useEffect(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
  }, [])
  
  /***
   * https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks
   * empty array as second argument = load only once
  */

  return (
    
    <TranslationProvider>
      
    {head}
  
    <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline /> 
     
  
    {layout?  (<PageLoadingIndicator><GoogleTagManager><Layout><Component {...pageProps} /></Layout></GoogleTagManager></PageLoadingIndicator>): <Component {...pageProps} />}
         
      </ThemeProvider>
    </TranslationProvider>

  );

}

WrappedApp.defaultProps = {
  theme: defaultTheme
}

export default connect()(WrappedApp)



