import React, {useState, useEffect} from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import * as JsSearch from 'js-search';
import { isFunction } from 'lodash';
import Grid from '@material-ui/core/Grid';

// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
// import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundColor: "white"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    minWidth: 200,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  buttons: {
    display: 'flex',
  },

  // sectionDesktop: {
  //   display: 'none',
  //   [theme.breakpoints.up('md')]: {
  //     display: 'flex',
  //   },
  // },
  // sectionMobile: {
  //   display: 'flex',
  //   [theme.breakpoints.up('md')]: {
  //     display: 'none',
  //   },
  // },
}));


function ToolBar({data, indexes, onSearch, buttons=null}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const [searchFunction, setSearchFunction] = useState(null)
  const [query, changeQuery] = useState("")
  const [filtered, setFiltered] = useState(data)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


 
  useEffect(()=>{
    buildSearchIndex()
  }, [])

  useEffect(() => {
    if(query.length>1){
      setFiltered(searchFunction.search(query))
    }else{
      //reset to original data
      setFiltered([])
    }
  },[query])

  useEffect(() => {
    if(isFunction(onSearch)){
      onSearch(filtered)
    }
  }, [filtered])

/**
 * 
 *  
*/

const buildSearchIndex = () => {
  /***
   * https://github.com/bvaughn/js-search
  */
  const search = new JsSearch.Search("id");
  search.sanitizer = new JsSearch.LowerCaseSanitizer();
  search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();

  if(Array.isArray(indexes)){
    indexes.forEach(idx => search.addIndex(idx))
    search.addDocuments(data)
  }
  setSearchFunction(search)
}

const handleSearch = (e) => {
  changeQuery(e.target.value)
}


/**
 * 
 *  
*/


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


 
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button aria-label="show 4 new mails" color="inherit">
         test
        </Button>
      </MenuItem>
      <MenuItem>
        <Button aria-label="show 11 new notifications" color="inherit">
            srest   
        </Button>
     
      </MenuItem>
     
    </Menu>
  );

  return (
    <>
    <div className={classes.grow}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar variant="dense">
          <Grid container spacing={1} justifyContent="center" alignItems='center'>
            <Grid item xs={12} sm={12} md={4} lg={3}>

            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={handleSearch}
              fullWidth={true}
            />

            </div>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={9}>

            <div className={classes.buttons}>
            {buttons}
          </div>


            </Grid>
          </Grid>
        
          
      
          {/* <div className={classes.grow} /> */}
         
          {/* <div className={classes.sectionDesktop}></div> */}
          {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    </>
  );
}


export default ToolBar