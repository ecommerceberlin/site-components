import React from 'react';
import PropTypes from 'prop-types';
import { map, get } from 'lodash';
import {connect} from 'react-redux'

import {TicketsSelector} from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'

// import { getCompanyProfileInfo, filterCompanyInstances } from '../helpers';

class Tickets extends React.PureComponent {


  componentDidMount(){

      const {resourceFetchRequest, data} = this.props

      if(!data.length){
        resourceFetchRequest(["tickets", "ticketgroups"])
      }
  }

  render(){
    const {children, data} = this.props
    return children( data )
  }

}

//  = ({ children, source, ...rest }) => {
//
//   const { filters, random, classes, width, mobile, limit } = rest;
//
//   const filter = function(item){
//
//     return item
//
//   }
//
//   let filtered = processArrayData(source, { filter, random, limit });
//
//   if (width === 'xs' && parseInt(mobile) && filtered.length > mobile) {
//     filtered = filtered.slice(0, mobile);
//   }
//
//   return children(filtered)
//
// };

Tickets.propTypes = {
  group_id: PropTypes.number.isRequired,
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
