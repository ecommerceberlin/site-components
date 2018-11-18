import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import { withStyles } from '@material-ui/core/styles';
import { translate } from '../i18n';
import compose from 'recompose/compose';
import classNames from 'classnames';

import Icon from './Icon';

const styles = theme => ({

  h: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'top',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },

  v: {
  //  maxWidth: 400
  },

  defaultPrimary: {
    color: '#000000',
  },

  defaultSecondary : {
    color : '#000000'
  },

  heroPrimary: {
    fontWeight: 600,
    color: '#ffffff',
    fontSize: '2.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
    }
  },

  heroSecondary: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 300,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
     // fontWeight: 600
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.1rem',
    }
  },


});

const EventInfo = ({
  classes,
  items,
  translate,
  orientation,
  style,
  size,
  invert,
  primaryStyle,
  secondaryStyle,
  iconStyle
}) => (
  <div style={{ ...style }}>
    <List component="ul" className={classes[orientation]}>
      {items.map(({ primary, icon, secondary }) => {
        return (
          <ListItem key={secondary}>
            {icon ? (
              <ListItemIcon>
                <Icon name={icon} variant={iconStyle} />
              </ListItemIcon>
            ) : null}
            <ListItemText
              primary={primary}
              secondary={translate(secondary)}
              classes={{
                primary: classNames(classes.defaultPrimary, (primaryStyle && primaryStyle in classes ? classes[primaryStyle] : null)),
                secondary: classNames(classes.defaultSecondary, (secondaryStyle && secondaryStyle in classes ? classes[secondaryStyle] : null))
              }}
            />
          </ListItem>
        );
      })}
    </List>
  </div>
);

EventInfo.defaultProps = {
  items: [],
  orientation: 'v',
  style: {},
  primaryStyle : null,
  secondaryStyle : null,
  iconStyle : "red"
};

const enhance = compose(
  withStyles(styles),
  translate
);

export default enhance(EventInfo);
