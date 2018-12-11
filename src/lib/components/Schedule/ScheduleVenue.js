import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import _get from 'lodash/get';
import Hidden from '@material-ui/core/Hidden';
import classNames from 'classnames'
import { connect } from 'react-redux';
import compose from 'recompose/compose'
import { getCompanyLogotype } from '../../helpers';
import {venueSelect} from './redux'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 35,
    cursor : 'pointer',

    [theme.breakpoints.down('md')]: {
      marginTop: 10,
      marginBottom: 15
    },
   
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
  },
  narrow : {
    maxWidth: 150,
  }
});

const ScheduleVenue = ({ name, company, classes, total, venueSelect}) => (
  <Hidden implementation="css">
    <div className={classes.root} onClick={ () => venueSelect(name) }>
      <div>
        <Avatar className={classes.avatar}>{name}</Avatar>
      </div>
      <div>
        <img
          src={getCompanyLogotype(company)}
          className={classNames(classes.logotype, {
            [classes.narrow] : total > 3
          })}
          alt=""
        />
      </div>
    </div>
  </Hidden>
);

ScheduleVenue.defaultProps = {
  total : 4
}

const enhance = compose(
  withStyles(styles),
  connect(null, {venueSelect})
)

export default enhance(ScheduleVenue);
