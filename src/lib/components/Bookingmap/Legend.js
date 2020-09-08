import React from 'react'
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import MyTypography from '../MyTypography'
import {FilteredTicketGroupsSelector} from '../../redux/selectors'
import PropTypes from 'prop-types'
import Booth from './Booth'
import { getStylingName } from "./boothStyles";
import Settings from '../../datasources/Settings';



const styles = {
    root : {
      display: 'flex',
      maxWidth : 1000,
      margin: '10px auto 10px auto',
      alignItems : 'center',
      justifyContent : 'center'
    },

    description : {
        marginRight : 10,
        maxWidth : 600,
    },
    
    groups : {
        flexGrow : 8,
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap'
    }
}

const data = {
    dh : 40,
    dw : 60,
}

const Legend = ({ticketgroups, boothStyleMapping, allowedGroupIds, classes}) =>  (

  
    <div className={classes.root}>
    <div className={classes.description}>
      <MyTypography label="event.sales.pool.legend" />
    </div>
    <div className={classes.groups}>


  <Settings>{(get) => 


    ticketgroups.filter(tg => get("bookingmap.allowedGroupIds", allowedGroupIds || []).includes(tg.id)).map(tg => <Booth 
        key={tg.name} 
        groupId={tg.id} 
        legend={true} 
        style={getStylingName(get("bookingmap.boothStyleMapping", boothStyleMapping || {}), tg.id)} 
        selected={false} 
        data={{...data, ti : tg.name}} 
        onClick={function(){} } 
        />)

}</Settings>


    </div>
    </div>
)

Legend.propTypes = {
    allowedGroupIds : PropTypes.array,
    ticketgroups: PropTypes.array.isRequired
}

Legend.defaultProps = {
    ticketgroups : [],
    allowedGroupIds: [],
    boothStyleMapping: {}
}

const enhance = compose(
    connect( (state,props) => {
        const mapStateToProps = (state, props) => {
            return {
                ticketgroups : FilteredTicketGroupsSelector(state, props),
            }
          }
          return mapStateToProps
    } ),
    withStyles(styles),
  );
  
export default enhance(Legend);
  