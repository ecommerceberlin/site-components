import React from 'react';
import PropTypes from 'prop-types';
import { map, get } from 'lodash';
import {connect} from 'react-redux'
import {TicketsSelector} from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'

class Tickets extends React.PureComponent {


  componentDidMount(){

      const {resourceFetchRequest, data} = this.props

      if(!data || !Array.isArray(data) || !data.length){
        resourceFetchRequest(["tickets", "ticketgroups"])
      }
  }

  render(){
    const {children, data} = this.props
    return children( data )
  }

}


Tickets.propTypes = {

  // filters : PropTypes.object
};

Tickets.defaultProps = {
  // filters : {},
  // mobile : 4
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        data : TicketsSelector(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Tickets)
