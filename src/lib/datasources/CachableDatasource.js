import React from 'react';
import {connect} from 'react-redux'
import {resourceFetchRequest } from '../components/redux'
import {FilteredDataSelector} from '../redux/selectors'
// import find from 'lodash/find'

class CachableDatasource extends React.PureComponent {

  componentDidMount(){

      const {resourceFetchRequest, queries, results} = this.props

      //TODO: skip request to non-empty result endpoints

      Object.values(queries).forEach(query => resourceFetchRequest(query))
      
  }

  render(){

    const {children, results} = this.props
    return children(results)
  }

}

CachableDatasource.defaultProps = {
  results : {},
};

CachableDatasource.defaultProps = {
  queries: {}
}

export default connect((state, props) => {
  const dataSet = {};
  Object.keys(props.queries).forEach(key => {
    dataSet[key] = FilteredDataSelector(state, props.queries[key])
  })
  return ({results: dataSet});
}, {resourceFetchRequest})(CachableDatasource)



