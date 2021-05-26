import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LinkedIn from '@material-ui/icons/LinkedIn';

import classNames from 'classnames';
import Cart from './CartButton';
import LanguageSelect from './LanguageSelect';
// import Search from './Search';
import AppBarLink from './AppBarLink'
import UpdateProfileLink from './UpdateProfileLink'
import RawTranslatedText from './RawTranslatedText'
import Settings from '../datasources/Settings';
import CircularProgress from '@material-ui/core/CircularProgress';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';


import {
  drawerShow,
  dialogShow
} from './redux/actions';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  spaced: {
    marginBottom: 65
  },
  flex: {
    flex: 1,
    cursor: 'pointer'
  },
  title: {
    cursor: 'pointer'
  },

  badge: {
    //  margin: theme.spacing(2),
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});



function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function HideOnScroll(props) {
  
  const { children } = props;
  const trigger = useScrollTrigger();
  
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


function LoginWithLinkedIn(props){

  return (
    <IconButton
    // onClick={drawerShow}
    // className={classes.menuButton}
    color="inherit"
    aria-label="Menu"
  >
    <LinkedIn />
  </IconButton>
  )
}

function MyAppBar(props) {

  const { classes, loading, drawerShow, dialogShow, cart, position, page_action } = props;

  const noItems = Object.keys(cart).length;
 
  return (

    <Settings>{(get) => (

    <div
      className={classNames(classes.root, {
        [classes.spaced]: noItems
      })}
    >
    <ElevationScroll>
    {/* <HideOnScroll> */}
      <AppBar elevation={0} color="inherit">
        <Toolbar >
          <IconButton
            onClick={drawerShow}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>


            {loading && <CircularProgress size={20} />}


            <Link href="/">
            <Typography
            component="a"
            variant="body1"
            color="inherit"
            className={classes.flex}>{
              get("common.event_name")
            }</Typography>
            </Link>
            

            {page_action || get("appbar.links", []).map(appbarLink => <AppBarLink key={appbarLink.label} {...appbarLink} />)}
            

            {/* <LoginWithLinkedIn /> */}

            {/* <UpdateProfileLink /> */}
            <LanguageSelect locales={ get("system.available_locales", []) } /> 

          {/* <Search /> */}
             
          {noItems > 0 ? <Cart count={noItems} /> : null}
        </Toolbar>

        {/* <Toolbar/> */}


      </AppBar>
      {/* </HideOnScroll> */}
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />

    </div>

    )}</Settings>

  );
}

MyAppBar.defaultProps = {
  position: 'fixed',
};

MyAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  connect(
    state => ({
      cart: state.app.cart,
      loading: "loading" in state.visuals ? state.visuals.loading : false,
      page_action: "page_action" in state.visuals ? state.visuals.page_action : null
    }),
    {drawerShow, dialogShow}
  ),
  withStyles(styles)
);

export default enhance(MyAppBar);
