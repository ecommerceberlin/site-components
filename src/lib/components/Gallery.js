import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
import MyTypography from './MyTypography';
import Red from './svg/Red'
import Gold from './svg/Gold'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import {dialogShow} from './redux/actions';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 50
  },
  gridList: {
    // flexWrap: 'nowrap',
    // // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    // transform: 'translateZ(0)',
    // height: '100%',

    width: '100%',
    height: 450,

  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    // background:
    //   'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },

  deSaturated: {
    filter: 'url(#svgGoldFilter)'
  },

  gridListTile: {
    // [theme.breakpoints.only('xs')]: {
    //   height: 300
    // },

    // [theme.breakpoints.only('sm')]: {
    //   height: 450
    // },

    // [theme.breakpoints.only('md')]: {
    //   height: 550
    // },

    // [theme.breakpoints.only('lg')]: {
    //   height: 700
    // },

    // [theme.breakpoints.only('xl')]: {
    //   height: 800
    // }
  }
});


const CloudinaryResize = ({src, children}) => {
   

  const resizeCloudinaryImage = (url, width = 1500, height = 1000, format = "jpg") => {

    //check if not already resized!
    if (url && /cloudinary/.test(url) && /image\/upload\/v[0-9]+/.test(url)) {
      return url.replace(/\.svg$/i, `.${format}`).replace("image/upload/", `image/upload/w_${width},h_${height},c_fit/`);
    }
  
    return url; //do nothing!
  }

  return children(resizeCloudinaryImage(src))

}


const CloudinaryFace = ({src, children}) => {
   

  const resizeCloudinaryImage = (url, width = 600, height = 200, format = "jpg") => {

    //check if not already resized!
    if (url && /cloudinary/.test(url) && /image\/upload\/v[0-9]+/.test(url)) {
      return url.replace(/\.svg$/i, `.${format}`).replace("image/upload/", `image/upload/w_${width},h_${height},c_fill,g_face/`);
    }
  
    return url; //do nothing!
  }

  return children(resizeCloudinaryImage(src))

}


const Gallery = ({ data, classes, label, cols, dialogShow }) => {

  function handleClick(item){

    dialogShow({
      title: <div>asd</div>,
      content: <div><CloudinaryResize src={item.src}>{src => <img src={src} alt="" style={{width: '100%'} }/> }</CloudinaryResize></div>,
  //    buttons: modalButtons
    });
  }
  


  return (

    <div className={classes.root}>
  
  
      <Gold />
  
      {label && <MyTypography label={label} template="H2C" />}
  
      {/* <WidthAwareInfo /> */}
  
      <GridList
        className={classes.gridList}
        cols={cols}
        cellHeight={200}
      >
        {data.map((item) => (
          <GridListTile
            key={item.src}
            classes={{ root: classes.gridListTile }}
            cols={item.cols || 3}
          >

          <CloudinaryFace src={item.src}>{
            src =>  <img src={src} alt="" className={classes.deSaturated} onClick={() => handleClick(item) } />
          }</CloudinaryFace>
          
          
          </GridListTile>
        ))}
      </GridList>
    </div>
  
  )
  

}



Gallery.defaultProps = {
  label : "gallery",
  data: [],
  cols: 12
};

Gallery.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  connect(null, {dialogShow})
)
export default enhance(Gallery);
