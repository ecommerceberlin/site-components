import React, { useEffect } from 'react';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import  {theme}  from '../material-ui';
import { reduxWrapper} from '../redux';
import * as gtag from '../services/gtag';
import {DetectLocale, TranslationProvider} from '../i18n';
import Layout from '../layouts/LayoutMain'

const WrappedApp = ({Component, pageProps, head}) => {

  useEffect(() => {
    
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    
    Router.events.on('routeChangeComplete', handleRouteChange)    

    /** Material UI */
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
    }

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }

  }, [])


  return (
    

      <TranslationProvider>
        
      {head}
    
       <ThemeProvider theme={theme}>
          <CssBaseline /> 
          <DetectLocale />
          <Layout>
          <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </TranslationProvider>
  );

}

export default WrappedApp;



