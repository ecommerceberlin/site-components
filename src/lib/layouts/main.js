import React from 'react';

import Head from '../next/MyHead';
import Chatlio from '../services/Chatlio';
import TranslationProvider from '../i18n/TranslationProvider';
import MyAppBar from '../components/MyAppBar'
import WidgetFooter from '../compositions/WidgetFooter'
import ScreenSize from '../material-ui/ScreenSize';

import Dialog from '../components/MyDialog'
import Snackbar from '../components/MySnackbar'
import Drawer from '../components/MyDrawer'
import defaultMenuItems from '../components/menuItems';


const Layout = ({ children, menuItems, appBarOpts, footerOpts }) => {
  return (
    <TranslationProvider>
      <ScreenSize />

      <Head />

      <MyAppBar {...appBarOpts} />

      {children}

       <WidgetFooter {...footerOpts} />

       <Dialog />
       <Snackbar />
       <Drawer items={menuItems} />

      <Chatlio button={false} />

    </TranslationProvider>
  );
};

Layout.defaultProps = {
  appBarOpts : {},
  menuItems : defaultMenuItems,
  footerOpts : {}
}

export default Layout;
