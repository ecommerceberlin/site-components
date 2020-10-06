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
import classNames from 'classnames';
import Cart from './CartButton';
import LanguageSelect from './LanguageSelect';
// import Search from './Search';
import AppBarLink from './AppBarLink'
import RawTranslatedText from './RawTranslatedText'
import Settings from '../datasources/Settings';
import CircularProgress from '@material-ui/core/CircularProgress';


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

function MyAppBar(props) {

  const { classes, loading, drawerShow, dialogShow, cart, position } = props;

  const noItems = Object.keys(cart).length;

  return (
    <div
      className={classNames(classes.root, {
        [classes.spaced]: noItems
      })}
    >
      <AppBar position={position} color="inherit">
        <Toolbar>
          <IconButton
            onClick={drawerShow}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>

      <Settings>{(get) => (

            <>

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

          

            {get("appbar.links", []).map(appbarLink => <AppBarLink key={appbarLink.label} {...appbarLink} />)}

            <LanguageSelect locales={ get("system.available_locales", []) } /> 
          </>

            )
          }</Settings>
      

          {/* <Search /> */}
    
         
          {noItems > 0 ? <Cart count={noItems} /> : null}
        </Toolbar>
      </AppBar>
    </div>
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
      loading: "loading" in state.visuals ? state.visuals.loading : false
    }),
    {drawerShow, dialogShow}
  ),
  withStyles(styles)
);

export default enhance(MyAppBar);
