import React from 'react';
import PropTypes from 'prop-types';
import { map, get } from 'lodash';
import {connect} from 'react-redux'

import {MobileAwareFilteredExhibitors} from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'

// import { getCompanyProfileInfo, filterCompanyInstances } from '../helpers';

class Visitors extends React.PureComponent {


  componentDidMount(){

      const {resourceFetchRequest, exhibitors} = this.props

      if(!exhibitors.length){
        resourceFetchRequest("exhibitors")
      }
  }

  render(){
    const {children, exhibitors} = this.props
    return children(exhibitors)
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

Visitors.propTypes = {
  // source: PropTypes.array.isRequired,
  // filters : PropTypes.object
};

Visitors.defaultProps = {
  // filters : {},
  // mobile : 4
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        exhibitors : MobileAwareFilteredExhibitors(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Visitors)
