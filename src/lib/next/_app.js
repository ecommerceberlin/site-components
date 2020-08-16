import React, { useEffect } from 'react';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import  {theme}  from '../material-ui';
import { reduxWrapper} from '../redux';
import * as gtag from '../services/gtag';
import {DetectLocale, TranslationProvider} from '../i18n';
import Layout from '../layouts/LayoutMain'
import Head from 'next/head'
import MyHead from '../next/MyHead';


const WrappedApp = ({Component, pageProps}) => {

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

      <Head>


      <meta
      name="viewport"
      content={
      'user-scalable=0, initial-scale=1, ' +
      'minimum-scale=1, width=device-width, height=device-height'
      }
      />


      {/* PWA primary color */}
      <meta name="theme-color" content={theme.palette.primary.main} />

      <script
      name="gtm"
      async
      src={`https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM}`}
      />

      <script
      name="gtmconfig"
      dangerouslySetInnerHTML={{
      __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GTM}');
      `
      }}
      />

      <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Lato:100,200,300,400,500&subset=latin,latin-ext"
      />

      <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Montserrat:500,600,700,800,900&subset=latin,latin-ext"
      />



      </Head>

       <ThemeProvider theme={theme}>
          <CssBaseline /> 
          <DetectLocale />
          <Layout>
            <MyHead />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </TranslationProvider>
  );

}

export default reduxWrapper.withRedux(WrappedApp);



