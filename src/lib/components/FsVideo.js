import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import {useSettings} from '../helpers'
import {useTranslate} from '../i18n'

const useStyles = makeStyles(theme => ({
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
     // background: 'linear-gradient(to right,rgba(230, 0, 0, 0.4), rgba(250, 0, 0, 0.9))',
      overflow: 'hidden',
    }

  },

  red : {
    "&:before" : {
      background: 'linear-gradient(to right,rgba(230, 0, 0, 0.4), rgba(250, 0, 0, 0.9))',
    }
  },

  black : {
    "&:before" : {
      background: 'linear-gradient(to right,rgba(25, 25, 25, 0.4), rgba(5, 5, 5, 0.9))',
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
    transform: 'translate(-50%,-50%)',

    [theme.breakpoints.down('md')]: {
      display: "none"
    },
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
}))

const FsVideo = ({ setting, ...props }) => {

  const classes = useStyles();
  const settings = useSettings(setting)
  const {videoSrc, background, children, overlay} = Object.assign({}, settings, props)
  return (
      <section className={classNames(classes.container, classes[overlay])} style={{ backgroundImage: `url(${background})` }}>
      <div className={classes.overlay}>{children}</div>

        {videoSrc ?  <video autoPlay muted loop playsInline className={classes.video} poster={background}>
          <source src={videoSrc} type="video/mp4" />
        </video>: null}
       
      </section>
  );
}

export default FsVideo
