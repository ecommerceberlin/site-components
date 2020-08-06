import React from 'react';
// import MyHead from '../next/MyHead';
import Chatlio from '../services/Chatlio';
import MyAppBar from '../components/MyAppBar'
import WidgetFooter from '../compositions/WidgetFooter'
import WidgetMenu from '../compositions/WidgetMenu'
import ScreenSize from '../material-ui/ScreenSize';
import Dialog from '../components/MyDialog'
import Snackbar from '../components/MySnackbar'


const Layout = ({ children, appBarOpts, footerOpts }) => {
  return (

    <>
      {/* <MyHead /> */}
      <ScreenSize />
   
      <MyAppBar {...appBarOpts} />
      {children}

       <WidgetFooter {...footerOpts} />
       <Dialog />
       <Snackbar />
       <WidgetMenu />

        <Chatlio button={false} />

    </>

  );
};

Layout.defaultProps = {
  appBarOpts : {},
  footerOpts : {}
}

export default Layout;
