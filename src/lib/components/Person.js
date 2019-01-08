import React from 'react';
import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import compose from 'recompose/compose';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/icons/ArrowForwardIos';


import Avatar from './MyAvatar';
import Typography from './MyTypography';
import { generateLinkParams } from '../helpers';
import Router from 'next/router'


const scrollTo = (to, as = null) => {
  if(typeof window !== 'undefined'){
    Router.push(to, as).then(() => window.scrollTo(0, 0))
  }
}

const styles = {

  root: {
    width: '100%',
    maxWidth: 400
  },

  images: {
    display: 'flex',
    alignItems: 'center',
    flexDirection : 'column',
  },

  logotype : {
    marginTop: 10,
    marginBottom : 10,
    height : 80,
    width : '50%',
    display : 'block',
    backgroundSize : 'contain',
    backgroundPosition : 'center',
    backgroundRepeat : 'no-repeat'
  },

  details : {
    marginTop: 10,
    display: 'flex',
  },

  data :{
    paddingLeft : 25,
  },

  bio: {
    marginTop: 10,
  }
};

const Person = ({
  classes,
  avatar,
  logotype,
  title,
  subtitle,
  text,
  minimal,
  link,
  id
}) => {

  const linkParams = generateLinkParams(title, 'speaker', id);

  return (
    <div className={classes.root}>

      <div className={classes.images}>
        
        <Avatar alt="" src={avatar} link={linkParams.as} />

        <div 
         className={classes.logotype } 
         style={{
           backgroundImage : `url(${logotype})`
         }} />

      </div>

      <div className={classes.details}>
        
        <div className={classes.data}>
        <Typography template="presenter1">{title}</Typography>
        {subtitle && <Typography template="presenter2">{subtitle}</Typography>}
        <Hidden smDown implementation="css">
          {text && <Typography template="presenterText">{text}</Typography>}
        </Hidden>
        </div>

        <div>
          {link &&  <IconButton onClick={() => scrollTo(linkParams.href, linkParams.as)}><Icon /></IconButton>}   
        </div>

      </div>
     
    </div>
  );
};

Person.defaultProps = {
  width: 'md',
  minimal: true,
  link: false
};

Person.propTypes = {
  classes: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  text: PropTypes.node
};

const enhance = compose(
  onlyUpdateForKeys(['id']),
  withStyles(styles)
);

export default enhance(Person);
