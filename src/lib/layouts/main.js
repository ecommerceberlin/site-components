import React from 'react';
import dynamic from 'next/dynamic';
import Head from '../next/MyHead';
import Chatlio from '../services/Chatlio';
import TranslationProvider from '../i18n/TranslationProvider';
import MyAppBar from '../components/MyAppBar'
import Footer from '../components/Footer'
import ScreenSize from '../material-ui/ScreenSize';
import menuItems from '../components/menuItems';



const Bundle = dynamic({
  modules : () => {

    const components = {
      Dialog : () => import('../components/MyDialog'),
      Snackbar : () => import('../components/MySnackbar'),
      Drawer : () => import('../components/MyDrawer')
    }
    return components;
  },
  render : (props, {Dialog, Snackbar, Drawer}) => 
    <React.Fragment>
      <Dialog />
      <Snackbar />
      <Drawer menuItems={props.menuItems} />
    </React.Fragment>
})




const Layout = ({ children }) => {
  return (
    <TranslationProvider>
      <ScreenSize />

      <Head />

      <MyAppBar />

      {children}

      <Footer />

      <Bundle menuItems={menuItems} />

      <Chatlio button={false} />
    </TranslationProvider>
  );
};

export default Layout;
