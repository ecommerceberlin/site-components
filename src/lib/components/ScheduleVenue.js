import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

import _get from 'lodash/get';
import { getCompanyLogotype } from '../helpers';

import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 35,

    [theme.breakpoints.down('md')]: {
      marginTop: 10,
      marginBottom: 15
    }
  },

  avatar: {
    width: 60,
    height: 60,
    fontSize: 25,
    fontWeight: 900,

    [theme.breakpoints.down('md')]: {
      width: 40,
      height: 40,
      fontSize: 18
    }
  },

  logotype: {
    maxWidth: 200,
    maxHeight: 60,
    marginLeft: 50,

    [theme.breakpoints.down('md')]: {
      maxWidth: 150,
      maxHeight: 40,
      marginLeft: 20
    }
  }
});

const ScheduleVenue = ({ name, company, classes }) => (
  <Hidden implementation="css">
    <div className={classes.root}>
      <div>
        <Avatar className={classes.avatar}>{name}</Avatar>
      </div>
      <div>
        <img
          src={getCompanyLogotype(company)}
          className={classes.logotype}
          alt=""
        />
      </div>
    </div>
  </Hidden>
);

export default withStyles(styles)(ScheduleVenue);
