import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from './MyAvatar';
import { MyLink } from '../next';
import Hidden from '@material-ui/core/Hidden';
import { useSettings } from '../helpers';
import Typography from  '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
});

const defaultProps = {
  width: 'md',
  minimal: true,
  link: false,
  mark : false,
  moreLabel : "common.more"
};


const Person = ({setting, ...props}) => {

  const classes = useStyles()
  const settings = useSettings(setting)
  const {
    id,
    avatar,
    title,
    subtitle,
    text,
    link,
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
        <Typography variant="h6">{title}</Typography>
        {subtitle && <Typography variant="subtitle1">{subtitle}</Typography>}
          {text && (<Hidden smDown implementation="css">
           <Typography variant="body2">{text}</Typography>
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


export default Person
