import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {MobileAwareFilteredAllExhibitors} from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'

class AllExhibitors extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, data} = this.props

      if(!data.length){
        resourceFetchRequest("allexhibitors")
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

AllExhibitors.propTypes = {
  data: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired,
  keyword : PropTypes.string
};

AllExhibitors.defaultProps = {
  data : [],
  keywords : [],
  keyword : ""
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        data : MobileAwareFilteredAllExhibitors(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(AllExhibitors);