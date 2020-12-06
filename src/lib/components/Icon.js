import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

import { capitalizeFirstLetter } from '../helpers';


import Facebook from '@material-ui/icons/Facebook';
import Twitter from '@material-ui/icons/Twitter';
import Linkedin from '@material-ui/icons/LinkedIn';
import Website from '@material-ui/icons/Web';
import Date from '@material-ui/icons/DateRange';
import Location from '@material-ui/icons/Room';
import Alarm from '@material-ui/icons/Alarm';



const icons = { Linkedin, Facebook, Twitter, Website, Date, Location, Alarm };

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  small: {
    fontSize: 20
  },

  red: {
    color: red[500],
    height: 30,
    width: 30
  },

  black: {
    color: '#000000',
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
