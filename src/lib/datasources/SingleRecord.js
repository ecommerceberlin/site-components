import React from 'react';
import {connect} from 'react-redux'
import {resourceFetchRequest } from '../components/redux'
import {SingleRecordSelector} from '../redux/selectors'

class SingleRecord extends React.Component {

  componentDidMount(){

      const {resourceFetchRequest, data, endpoint, id, slug} = this.props
      const key = id && id > 0 ? `${endpoint}/${id}` : `${endpoint}/${slug}`;

      if(! ("id" in data)){
        resourceFetchRequest(key)
      }
  }

  render(){

    const {children, data, initialData} = this.props

    if(!("id" in data) && "id" in initialData){
      return children(initialData)
    }

    return children(data)
    
  }

}


SingleRecord.defaultProps = {
  data : {},
  initialData: {}
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
