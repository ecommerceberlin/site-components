import React from 'react';

import Head from '../next/MyHead';
import Chatlio from '../services/Chatlio';
import TranslationProvider from '../i18n/TranslationProvider';
import MyAppBar from '../components/MyAppBar'
import WidgetFooter from '../compositions/WidgetFooter'
import WidgetMenu from '../compositions/WidgetMenu'

import ScreenSize from '../material-ui/ScreenSize';

import Dialog from '../components/MyDialog'
import Snackbar from '../components/MySnackbar'


const Layout = ({ children, appBarOpts, footerOpts }) => {
  return (
    <TranslationProvider>
      <ScreenSize />

      <Head />

      <MyAppBar {...appBarOpts} />

      {children}

       <WidgetFooter {...footerOpts} />

       <Dialog />
       <Snackbar />
       <WidgetMenu />

      <Chatlio button={false} />

    </TranslationProvider>
  );
};

Layout.defaultProps = {
  appBarOpts : {},
  footerOpts : {}
}

export default Layout;
