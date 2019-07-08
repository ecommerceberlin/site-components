import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {MobileAwareFilteredVisitors} from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'

class Vips extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, data} = this.props

      if(!data.length){
        resourceFetchRequest("vips")
      }
  }


  render(){

    const {children, data} = this.props

    if(children){

      return children(data)

    }

    return null
  }

}

Vips.propTypes = {
  data: PropTypes.array.isRequired
};

Vips.defaultProps = {
  data : []
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        data : MobileAwareFilteredVisitors(state, props)
        }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Vips)
