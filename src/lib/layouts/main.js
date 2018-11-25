import React from 'react';

import Head from '../next/MyHead';
import Chatlio from '../services/Chatlio';
import TranslationProvider from '../i18n/TranslationProvider';
import MyAppBar from '../components/MyAppBar'
import Footer from '../components/Footer'
import ScreenSize from '../material-ui/ScreenSize';
import menuItems from '../components/menuItems';

import Dialog from '../components/MyDialog'
import Snackbar from '../components/MySnackbar'
import Drawer from '../components/MyDrawer'




const Layout = ({ children }) => {
  return (
    <TranslationProvider>
      <ScreenSize />

      <Head />

      <MyAppBar />

      {children}

        <Footer />

       <Dialog />
       <Snackbar />
       <Drawer items={menuItems} />

      <Chatlio button={false} />
    </TranslationProvider>
  );
};

export default Layout;
