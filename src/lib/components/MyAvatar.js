import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
//import classNames from 'classnames'

const styles = theme => ({
  avatar: {
    width: 100,
    height: 100,

    [theme.breakpoints.up('sm')]: {
      width: 250,
      height: 250
    },

  },

  tinyAvatar: {
    width: 50,
    height: 50,

    [theme.breakpoints.up('sm')]: {
      width: 100,
      height: 100
    },

  },


  image: {
    filter: 'grayscale(100%) contrast(115%)'
  }
});

const MyAvatar = ({ classes, src, alt, tiny }) => (
  <Avatar
    alt={alt}
    src={src}
    classes={{
      root: tiny ? classes.tinyAvatar: classes.avatar,
      img: classes.image
    }}
  />
);

MyAvatar.defaultProps = {
  id : 0,
  src: '',
  tiny: false,
  alt: ""
};

export default withStyles(styles)(MyAvatar);
