import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {resourceFetchRequest } from '../components/redux'
import {FilteredDataSelector} from '../redux/selectors'
import find from 'lodash/find'

class Posts extends React.PureComponent {

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

Posts.propTypes = {

};

Posts.defaultProps = {
    all : [],
};

Posts.defaultProps = {
  queries: {}
}

export default connect(

  (state, props) => {

    const mapStateToProps = (state, props) => {
      return {
        results: FilteredDataSelector(state, props)
      }
    }
    return mapStateToProps

}, {resourceFetchRequest})(Posts)
