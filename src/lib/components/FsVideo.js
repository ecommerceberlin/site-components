//import PropTypes from 'prop-types';

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { isBigScreen } from '../helpers';

const styles = theme => ({
  container: {

    backgroundRepeat: 'no-repeat no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height: '100vh',
    width: '100%',

    position: 'relative',
    overflow: 'hidden',

    "&:before" : {
      content: "''",
      position: 'absolute',
      top:0,
      right:0,
      left:0,
      bottom:0,
      zIndex: 9,
      background: 'linear-gradient(to right,rgba(230, 0, 0, 0.4), rgba(250, 0, 0, 0.9))',
      overflow: 'hidden',
    }

  },


  video : {

    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  },

  overlay: {
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    //https://stackoverflow.com/questions/21224411/css-calc-viewport-units-workaround
    marginTop: -64,
    paddingTop: 64,
    boxSizing: 'border-box',
  },

  h1: {}
});

const FsVideo = ({ width, videoSrc, background, classes, children }) => (

  <section className={classes.container}
    style={{ backgroundImage: `url(${background})` }}
    >

    <div className={classes.overlay}>{children}</div>

    {isBigScreen(width) && videoSrc ? (

      <video autoPlay muted loop className={classes.video} poster={background}>
        <source src={videoSrc} type="video/mp4" />
      </video>

    ) : null}


  </section>

);

FsVideo.defaultProps = {
  width: 'xs',
  background: "",
  videoSrc : null,
  label: null,
  text: ''
};


const enhance = compose(
  connect(state => ({ width: state.app.width })),
  withStyles(styles)
);

export default enhance(FsVideo);
