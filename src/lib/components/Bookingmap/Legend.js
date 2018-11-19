import React from 'react'
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import MyTypography from '../MyTypography'
import {FilteredTicketGroupsSelector} from '../../redux/selectors'
import PropTypes from 'prop-types'

import Booth from './Booth'

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

const Legend = ({ticketgroups, classes}) =>  (
  <div className={classes.root}>
  <div className={classes.description}>
    <MyTypography label="event.sales.pool.legend" />
  </div>
  <div className={classes.groups}>
  {ticketgroups.map(tg => <Booth key={tg.name} groupId={tg.id} legend={true} styling={"style1"} selected={false} data={{...data, ti : tg.name}} onClick={function(){} } />)}
  </div>
  </div>
)

Legend.propTypes = {
    allowedGroupIds : PropTypes.array
}

Legend.defaultProps = {
    ticketgroups : []
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
  