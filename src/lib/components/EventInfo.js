import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import {makeStyles} from '@material-ui/core/styles';
import { useTranslate } from '../i18n';
import classNames from 'classnames';
import Icon from './Icon';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(
  theme => ({

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
      fontSize: '1.5rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '1.3rem',
      },
      [theme.breakpoints.down('sm')]: {
          fontSize: '1.15rem',
      }
    },
  
    heroSecondary: {
      color: '#ffffff',
      fontSize: '1.3rem',
      fontWeight: 300,
      [theme.breakpoints.down('md')]: {
        fontSize: '1.15rem',
       // fontWeight: 600
      },
      [theme.breakpoints.down('sm')]: {
          fontSize: '1rem',
      }
    },
  
  
  })
);

const EventInfo = ({
  items,
  orientation,
  style,
  size,
  invert,
  primaryStyle,
  secondaryStyle,
  iconStyle
}) => {

  const classes = useStyles()
  const [translate] = useTranslate()

  const filtered = items && Array.isArray(items)? items.filter(({primary, secondary}) => primary): []


  if(isEmpty(filtered)){
    return null
  }

  return (
    <div style={{ ...style }}>
      <List component="ul" className={classes[orientation]}>
        {filtered.map(({ primary, icon, secondary }) => (
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
          ))}
      </List>
    </div>
  );

}

EventInfo.defaultProps = {
  items: [],
  orientation: 'v',
  style: {},
  primaryStyle : null,
  secondaryStyle : null,
  iconStyle : "red"
};


export default EventInfo
