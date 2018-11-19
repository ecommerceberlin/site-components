import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

import { capitalizeFirstLetter } from '../helpers';

import {
  Linkedin,
  Facebook,
  Twitter,
  Web as Website,
  CalendarRange as Date,
  MapMarker as Location,
  Alarm
} from 'mdi-material-ui';

const icons = { Linkedin, Facebook, Twitter, Website, Date, Location, Alarm };

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  small: {
    fontSize: 20
  },

  red: {
    color: red[500],
    height: 30,
    width: 30
  },

  yellow: {
    color: "yellow",
    height: 80,
    width: 80
  },

    heroIcon : {
      color: yellow[100],
      width : 50,
      height : 50
    },

});

const Icon = ({ name, classes, variant, className }) => {
  const capName = capitalizeFirstLetter(name);

  const IconComponent = icons[capName];

  const ret = (
    <IconComponent className={classNames(classes.leftIcon, classes[variant])} />
  );

  return React.isValidElement(ret) ? ret : null;
};

Icon.defaultProps = {
  variant: 'small',
  className : ""
};

export default withStyles(styles)(Icon);
