import React from 'react';

import Router from 'next/router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//import {  MenuItem } from '@material-ui/core/Menu';

import { translate } from '../i18n';

const MenuItemLink = ({ to, baseLabel, label, text, icon, translate }) => (
  <ListItem button={true} onClick={() => Router.push(to).then(() => window.scrollTo(0, 0)) }>
    {/* {icon && <ListItemIcon>{icon}</ListItemIcon>} */}
    <ListItemText
      primary={label ? translate(`common.menu.${baseLabel}.${label}`) : text}
    />
  </ListItem>
);

export default translate(MenuItemLink);
