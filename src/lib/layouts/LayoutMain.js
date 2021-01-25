import React from 'react';
import Chatlio from '../services/Chatlio';
import MyAppBar from '../components/MyAppBar'
import WidgetFooter from '../compositions/WidgetFooter'
import WidgetMenu from '../compositions/WidgetMenu'
import ScreenSize from '../material-ui/ScreenSize';
import Dialog from '../components/MyDialog'
import Snackbar from '../components/MySnackbar'
import ScrollTop from '../components/ScrollTop' 
import Settings from '../datasources/Settings'
import Box from '@material-ui/core/Box'

const Layout = ({ children, appBarOpts, footerOpts }) => {
  return (

    <>
    <ScreenSize />
    <MyAppBar {...appBarOpts} />

    <Settings>{(get) => {
    if(get("system.maintenance", false)){
      return <Box m={20} p={20} fontSize="5rem" textAlign="center">Maintenance. Coming soon</Box>
    }

    return children;

    }}</Settings>

    <WidgetFooter {...footerOpts} />
    <ScrollTop />
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
