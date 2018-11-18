import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {resourceFetchRequest } from '../components/redux'
import {SingleRecordSelector} from '../redux/selectors'

class SingleRecord extends React.PureComponent {

  componentDidMount(){

      const {resourceFetchRequest, data, endpoint, id} = this.props
      const key = `${endpoint}/${id}`

      if(! "id" in data){
        resourceFetchRequest(key)
      }
  }

  render(){

    const {children, data} = this.props

    return children(data)
  }

}

SingleRecord.propTypes = {
  data: PropTypes.object.isRequired,
  endpoint : PropTypes.string.isRequired,
  id : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

SingleRecord.defaultProps = {
  data : {}
};

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        data : SingleRecordSelector(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(SingleRecord)
