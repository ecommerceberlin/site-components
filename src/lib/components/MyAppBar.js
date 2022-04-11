import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LinkedIn from '@material-ui/icons/LinkedIn';
import classNames from 'classnames';
import CartButton from './CartButton';
import LanguageSelect from './LanguageSelect';
// import Search from './Search';
import AppBarLink from './AppBarLink'
import UpdateProfileLink from './UpdateProfileLink'
import RawTranslatedText from './RawTranslatedText'
import Settings from '../datasources/Settings';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { CartItemsSelector } from '../redux/selectors'
import { useSettings } from '../helpers'
import { drawerShow, dialogShow } from './redux/actions';
import LinearProgress from '@material-ui/core/LinearProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({

  spaced: {
    marginBottom: 0
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
  },

  grow: {
    flexGrow: 1,
  },
  buttons: {
    display: 'flex'
  }
}));


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


const defaultProps = {
  position: 'fixed',
  links: [],
  profile: []
}

function MyAppBar({setting="appbar", ...props}) {

  const cartItems = useSelector(CartItemsSelector)
  const loading = useSelector((state) => state.visuals.loading)
  const page_action = useSelector((state) => state.visuals.page_action)
  const dispatch = useDispatch()
  const classes = useStyles()
  const settings = useSettings(setting)
  const {event_name, event_name_short} = useSettings("common", {})
  const {logotype, links, position} = Object.assign({}, defaultProps, settings, props)
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
 
  return (<div className={classNames(classes.grow, {
        // [classes.spaced]: cartItems
      })}>
    <ElevationScroll>
    {/* <HideOnScroll> */}
      <AppBar elevation={0} color="inherit" position={position}>
        <Toolbar >
          <IconButton
            onClick={()=>dispatch(drawerShow())}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
            <Link href="/">

          {logotype && logotype.includes("http") ? <img src={logotype} alt="" style={{cursor: "pointer"}} /> :  <Typography component="a" variant="body1" color="inherit" className={classes.flex}>{isMobile && event_name_short? event_name_short: event_name}</Typography>}

            </Link>
            <div className={classes.grow} />
            <div className={classes.buttons}>
            {page_action || links.map(appbarLink => <AppBarLink key={appbarLink.label} {...appbarLink} />)}
            {cartItems > 0 ? <CartButton count={cartItems} /> : null}
            {/* <LoginWithLinkedIn /> */}
            <UpdateProfileLink />
            <LanguageSelect /> 
          {/* <Search /> */}
          </div>
        </Toolbar>
        {/* <Toolbar/> */}

        {loading && <LinearProgress  color="secondary" />}

      </AppBar>
      {/* </HideOnScroll> */}
      </ElevationScroll>
      <div id="back-to-top-anchor" />
    </div>);
}

export default MyAppBar
