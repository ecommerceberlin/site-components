import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import _get from 'lodash/get';
import Hidden from '@material-ui/core/Hidden';
import classNames from 'classnames'
import { connect } from 'react-redux';
import compose from 'recompose/compose'
import { getCompanyProfileInfo } from '../../helpers';
import {venueSelect, venueSelectReset, VenueSelector} from './redux'
import { useTranslate } from '../../i18n';
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

    '&:hover .MuiAvatar-root': {  // Add this block
      backgroundColor: 'gold',
      color: 'black'
    }
   
  },

  avatar: {
    width: 45,
    height: 45,
    fontSize: 25,
    fontWeight: 900,
    color : "black",
    backgroundColor : theme.palette.grey[200],
    borderRadius: 3,

    [theme.breakpoints.down('md')]: {
      width: 35,
      height: 35,
      fontSize: 18
    },

  


  },

  active : {
    backgroundColor : "gold",
    color : "black"
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

const ScheduleVenue = ({ name, company, classes, total, template, selectedVenue, venueSelect, venueSelectReset}) => {

  const [translate] = useTranslate()
  const logotype = getCompanyProfileInfo(company, "thumbnail")
  return (
    <Hidden implementation="css">
      <div className={classes.root} onClick={ () => selectedVenue === name ? venueSelectReset() : venueSelect(name) }>
        <div>
          <Avatar variant="square" className={classNames(
            {
              [classes.avatar]: true,
              [classes.active]: selectedVenue === name
            } )}>{name}</Avatar>
        </div>
        <div> {logotype &&   <img
            src={logotype}
            className={classNames(classes.logotype, {
              [classes.narrow] : total > 3
            })}
            alt=""
          />}
        
        <span style={{marginLeft: 10}}>{selectedVenue === name? translate("common.click_to_reset"): translate("common.click_to_select") }</span>

        </div>
      </div>
    </Hidden>
  );
} 

ScheduleVenue.defaultProps = {
  total : 4,
  template : "black"
}

const enhance = compose(
  withStyles(styles),
  connect((state) => ({
    selectedVenue : VenueSelector(state)
  }), {venueSelect, venueSelectReset})
)

export default enhance(ScheduleVenue);
