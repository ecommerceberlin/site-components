import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import _get from 'lodash/get';

import { getTicketGroup } from '../../redux/selectors'
import boothStyles, { getStylingName } from './boothStyles'

import Typography from '../MyTypography';
import classNames from 'classnames'

const styles  = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  customBooth: {
    display: 'table',
    width: 105,
    height: 70,
    borderRadius: 3,
    padding: 0,
    marginBottom: 20,
    boxShadow: '1px 1px #555555'
  },

  customBoothText: {
    display: 'table-cell',
    verticalAlign : 'middle',
    textAlign : 'center',
    fontWeight: 900,
    fontFamily: "'Verdana', 'Arial', sans-serif",
    fontSize: 15
  },

};

const mergedStyles = Object.assign(styles, boothStyles)


const BoothInfoHeader = ({ 
  ticketgroup,
  classes,
  boothId,
  groupId,
  label,
  status
 }) => {
  
  const bookable = (status != "hold" && status != "sold")

  return (
    <div className={classes.container}>
      <div
        className={classNames(
          classes.customBooth,
          { 
            [classes[getStylingName(ticketgroup.id)]] : bookable,
            [classes.boothSold] : !bookable
          }
        )}
      >
        <div className={classes.customBoothText}>{label}</div>
      </div>

      <Typography>{_get(ticketgroup, 'name')}</Typography>
    </div>
  );
};


const enhance = compose(
  connect(
    (state, props) => {
      const mapStateToProps = (state, props) => {
        return {
          ticketgroup : getTicketGroup(state, props)
        }
      }
      return mapStateToProps}
  ),
  withStyles(mergedStyles),
  onlyUpdateForKeys(["status", "groupId"])
)

export default enhance(BoothInfoHeader);



/*

GROUP

agg : {offered: 30, sold: 27, customers: 27}
descriptions : {pl: "...", en: "...", de: ""}
id : 248
limit : 29
map : {....}
name : "Standard"
tickets : []

*/

/*
FORMDATA
{id: "booth-22-242", ti: "D 1.2"}
*/
