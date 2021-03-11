import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import RawTranslatedText from './RawTranslatedText'
import Router from 'next/router'
import {useSettings} from '../helpers'


const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 600,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 300,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid #ffffff',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    filter: 'grayscale(100%)'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(6)}px`,
    fontSize : 40
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },

}))

const scrollTo = (to, as) => {
  if(typeof window !== 'undefined'){
    Router.push(to).then(() => window.scrollTo(0, 0))
  }
}

function FsButtons({ setting = "rolebuttons", ...props }) {

  const settings = useSettings(setting)
  const classes = useStyles()
  const {items = [], first = false, accent = "gold"} = Object.assign({}, settings, props)

  return (
    <div className={classes.root} style={ first ? {marginTop: 10} : {}}>
      {items.map(({label, url, width, target}) => {

        if(!width){
          width = `${100/items.length}%`
        }

        return (
          <ButtonBase
            focusRipple
            key={label}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: width,
            }}
            onClick={() => scrollTo(target)}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="h5"
                color="inherit"
                className={classes.imageTitle}
              >
                <RawTranslatedText label={label} />
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        )

      })}
    </div>
  );
}



export default FsButtons
