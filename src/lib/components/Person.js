import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from './MyAvatar';
import Typography from './MyTypography';
import { MyLink } from '../next';
import Hidden from '@material-ui/core/Hidden';
import { useSettings } from '../helpers';
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

const defaultProps = {
  width: 'md',
  minimal: true,
  link: false,
  mark : false,
  moreLabel : "common.more"
};


const Person = ({setting, ...props}) => {

  const settings = useSettings(setting)
  const {
    id,
    classes,
    avatar,
    title,
    subtitle,
    text,
    minimal,
    link,
    data,
    mark,
    moreLabel
  } = Object.assign({}, defaultProps, settings, props)

  return (
    <Card className={classes.card} elevation={mark ? 2 : 0}>
      <CardHeader
        avatar={<Avatar id={id} alt="" src={avatar} />}
        classes={{
          ...{root : classes.avatarContainer},
          ...{avatar : classes.avatar}
        }}
      />

      <CardContent>
        <Typography template="presenter1">{title}</Typography>
        {subtitle && <Typography template="presenter2">{subtitle}</Typography>}
          {text && (<Hidden smDown implementation="css">
           <Typography template="presenterText">{text}</Typography>
           </Hidden>)}
        
      </CardContent>

      {link && (
        <CardActions>
          <MyLink href={link} label={moreLabel} />
        </CardActions>
      )}
    </Card>
  );
};


const enhance = compose(
  onlyUpdateForKeys(['id', 'avatar', 'mark']),
  withStyles(styles)
);

export default enhance(Person);
