import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';


import Avatar from './MyAvatar';
import Typography from './MyTypography';

import { MyLink } from '../next';
import Hidden from '@material-ui/core/Hidden';

import { generateLinkParams } from '../helpers';

import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import compose from 'recompose/compose';
import isFunction from 'lodash/isFunction';

const styles = {
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  avatar : {
    marginRight : 0
  },
  card: {
    width: '100%',
    maxWidth: 400
  },

  cardMobile: {},

  // media: {
  //   height: 200,
  // },

  bio: {
    marginTop: 10
  }
};

const Person = (props) => {

  const {
    classes,
    avatar,
    title,
    subtitle,
    text,
    minimal,
    link,
    id,
    data,
    mark,
    moreLabel
  } = props;
  
  const linkParams = isFunction(link) ? link(props) : {}
  const {as, href} = linkParams

  return (
    <Card className={classes.card} elevation={mark ? 2 : 0}>
      <CardHeader
        avatar={<Avatar alt="" src={avatar} link={as} />}
        // title="test"
        // subheader="srest"
        classes={{
          ...{root : classes.avatarContainer},
          ...{avatar : classes.avatar}
        }}
      />

      <CardContent>
        <Typography template="presenter1">{title}</Typography>

        {subtitle && <Typography template="presenter2">{subtitle}</Typography>}

       
          {text && 
           <Hidden smDown implementation="css">
           <Typography template="presenterText">{text}</Typography>
           </Hidden>
          }
        
      </CardContent>

      {linkParams && (
        <CardActions>
          <MyLink {...linkParams} label={moreLabel} />
        </CardActions>
      )}
    </Card>
  );
};

Person.defaultProps = {
  width: 'md',
  minimal: true,
  link: false,
  mark : false,
  moreLabel : "common.more"
};

Person.propTypes = {
  classes: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  text: PropTypes.node
};

const enhance = compose(
  onlyUpdateForKeys(['id', 'mark']),
  withStyles(styles)
);

export default enhance(Person);
