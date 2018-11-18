import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {MobileAwarePhotosSelector, PhotoSizeSelector} from '../redux/selectors'
import {resourceFetchRequest } from '../components/redux'

class Photos extends React.PureComponent {

  componentDidMount(){

      const {resourceFetchRequest, data} = this.props

      if(! data.length){
        resourceFetchRequest("photos")
      }
  }

  render(){
    const {children, data, size} = this.props
    return children(data, size)
  }

}

Photos.propTypes = {

};

Photos.defaultProps = {
  data : [],
  size : {}
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        data : MobileAwarePhotosSelector(state, props),
        size : PhotoSizeSelector(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Photos)
