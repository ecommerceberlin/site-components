import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {MobileAwareFilteredPartners} from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'

class Partners extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, data} = this.props

      if(!data.length){
        resourceFetchRequest("partners")
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

Partners.propTypes = {
  data: PropTypes.array.isRequired
};

Partners.defaultProps = {
  data : []
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        data : MobileAwareFilteredPartners(state, props)
        }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Partners)
