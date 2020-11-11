import React, { useEffect, useState } from 'react';
import Router, {useRouter} from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import  {createTheme, defaultTheme}  from '../material-ui';
//import { reduxWrapper} from '../redux';
import * as gtag from '../services/gtag';
import {DetectLocale, TranslationProvider} from '../i18n';
import Layout from '../layouts/LayoutMain'
import {pageLoadingStart, pageLoadingEnd, pageActionHide } from '../components/redux'
import { connect } from 'react-redux';


export function reportWebVitals(metric) {
//  if (metric.label === 'web-vital') {
    //console.log(metric) // The metric object ({ id, name, startTime, value, label }) is logged to the console
//  }
}

const WrappedApp = ({Component, pageProps, head, theme, router, pageLoadingStart, pageLoadingEnd, pageActionHide}) => {

  useEffect(() => {
    
    const handleStart = (url) => {
      
      if(url !== router.asPath){
        pageLoadingStart();
      }

    }

    const handleComplete = (url) => {

      if(url === router.asPath){
        pageLoadingEnd();
      }

      gtag.pageview(url)
    }
    

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)


    /** Material UI */
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
    }

   


    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)


     // pageActionHide();

    }

  })
  
  /***
   * https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks
   * empty array as second argument = load only once
  */

  return (
    
    <TranslationProvider>
      
    {head}
  
    <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline /> 
        <DetectLocale />
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </TranslationProvider>

  );

}

WrappedApp.defaultProps = {
  theme: defaultTheme
}

export default connect(undefined, {pageLoadingStart, pageLoadingEnd, pageActionHide})(WrappedApp);



